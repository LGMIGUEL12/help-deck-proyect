import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Conectar a la base de datos
    await connectDB()

    const body = await readBody(event)
    const { email, name, role, department, password } = body

    // Validaciones básicas
    if (!email || !name) {
      throw createError({
        statusCode: 400,
        message: 'Email y nombre son requeridos'
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

    // Crear nuevo usuario
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: password || 'Password123!', // Password por defecto si no se proporciona
      name,
      role: role || 'user',
      department: department || ''
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
    console.error('Error al crear usuario:', error)
    throw createError({
      statusCode: 500,
      message: 'Error en el servidor'
    })
  }
})