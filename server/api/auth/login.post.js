import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Conectar a la base de datos
    await connectDB()

    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email y contraseña son requeridos'
      })
    }

    // Buscar usuario por email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      })
    }

    // Validar password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Credenciales inválidas'
      })
    }

    // Retornar usuario sin password (el método toJSON lo hace automáticamente)
    return {
      success: true,
      user: user.toJSON(),
      message: 'Login exitoso'
    }
  } catch (error) {
    // Si es un error ya creado, lanzarlo de nuevo
    if (error.statusCode) {
      throw error
    }

    // Error de base de datos u otro
    console.error('Error en login:', error)
    throw createError({
      statusCode: 500,
      message: 'Error en el servidor'
    })
  }
})