import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Conectar a la base de datos
    await connectDB()

    const body = await readBody(event)
    const { email, password, name, phone, birthDate } = body

    // Validaciones básicas
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        message: 'Email, contraseña y nombre son requeridos'
      })
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'Ya existe un usuario con este correo electrónico'
      })
    }

    // Crear nuevo usuario con foto por defecto
    const newUser = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      phone: phone || '',
      profilePhoto: 'https://img.freepik.com/foto-gratis/retrato-hombre-feliz-sonriente_171337-5055.jpg',
      department: 'General',
      jobTitle: 'Software Engineer'
    })

    // Retornar usuario sin password
    return {
      success: true,
      user: newUser.toJSON(),
      message: 'Usuario creado exitosamente'
    }
  } catch (error) {
    // Si es un error ya creado, lanzarlo de nuevo
    if (error.statusCode) {
      throw error
    }

    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      throw createError({
        statusCode: 400,
        message: messages.join(', ')
      })
    }

    // Error de base de datos u otro
    console.error('Error en signup:', error)
    throw createError({
      statusCode: 500,
      message: 'Error en el servidor'
    })
  }
})