import { User } from '../../models/User.js'
import { connectDB } from '../../utils/database.js'

export default defineEventHandler(async (event) => {
  try {
    // Conectar a la base de datos
    await connectDB()

    const body = await readBody(event)
    const { userId, name, jobTitle, phone, email, address, department, profilePhoto, interests } = body

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'ID de usuario es requerido'
      })
    }

    // Buscar usuario por ID
    const user = await User.findById(userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Usuario no encontrado'
      })
    }

    // Campos que se pueden actualizar
    const updateData = {}

    if (name !== undefined) updateData.name = name
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle
    if (phone !== undefined) updateData.phone = phone
    if (address !== undefined) updateData.address = address
    if (department !== undefined) updateData.department = department
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto
    if (interests !== undefined) updateData.interests = interests

    // Si se está cambiando el email, verificar que no esté en uso
    if (email !== undefined && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() })
      if (emailExists) {
        throw createError({
          statusCode: 400,
          message: 'Este email ya está en uso'
        })
      }
      updateData.email = email.toLowerCase()
    }

    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    // Retornar usuario actualizado sin password
    return {
      success: true,
      user: updatedUser.toJSON(),
      message: 'Perfil actualizado exitosamente'
    }
  } catch (error) {
    // Si es un error ya creado, lanzarlo de nuevo
    if (error.statusCode) {
      throw error
    }

    // Error de base de datos u otro
    console.error('Error al actualizar perfil:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al actualizar el perfil'
    })
  }
})