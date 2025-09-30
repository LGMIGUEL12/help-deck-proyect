import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Conectar a la base de datos
    await connectDB()

    // Obtener todos los usuarios
    const users = await User.find({}).sort({ createdAt: -1 })

    // Retornar usuarios sin passwords
    return {
      success: true,
      users: users.map(user => user.toJSON())
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al obtener los usuarios'
    })
  }
})