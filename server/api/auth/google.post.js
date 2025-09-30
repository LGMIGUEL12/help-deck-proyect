import { OAuth2Client } from 'google-auth-library'
import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    const body = await readBody(event)
    const { credential } = body

    if (!credential) {
      throw createError({
        statusCode: 400,
        message: 'Credencial de Google es requerida'
      })
    }

    // Obtener el cliente ID de Google desde las variables de entorno
    const config = useRuntimeConfig()
    const googleClientId = config.googleClientId

    if (!googleClientId) {
      throw createError({
        statusCode: 500,
        message: 'Configuración de Google OAuth no encontrada'
      })
    }

    // Verificar el token de Google
    const client = new OAuth2Client(googleClientId)

    let ticket
    try {
      ticket = await client.verifyIdToken({
        idToken: credential,
        audience: googleClientId
      })
    } catch (error) {
      console.error('Error al verificar token de Google:', error)
      throw createError({
        statusCode: 401,
        message: 'Token de Google inválido'
      })
    }

    const payload = ticket.getPayload()
    const { sub: googleId, email, name, picture } = payload

    // Buscar usuario por Google ID o email
    let user = await User.findOne({
      $or: [
        { googleId },
        { email: email.toLowerCase() }
      ]
    })

    if (user) {
      // Si el usuario existe pero no tiene googleId, actualizarlo
      if (!user.googleId) {
        user.googleId = googleId
        user.authProvider = 'google'
        if (picture && !user.profilePhoto) {
          user.profilePhoto = picture
        }
        await user.save()
      }
    } else {
      // Crear nuevo usuario con datos de Google
      user = await User.create({
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        googleId,
        authProvider: 'google',
        profilePhoto: picture || undefined
      })
    }

    // Retornar usuario sin password
    return {
      success: true,
      user: user.toJSON(),
      message: 'Autenticación con Google exitosa'
    }
  } catch (error) {
    // Si es un error ya creado, lanzarlo de nuevo
    if (error.statusCode) {
      throw error
    }

    // Error de base de datos u otro
    console.error('Error en Google OAuth:', error)
    throw createError({
      statusCode: 500,
      message: 'Error en el servidor'
    })
  }
})