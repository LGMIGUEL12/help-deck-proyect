import { User } from '../models/User.js'

export const getUserFromHeaders = async (event) => {
  const userId = getHeader(event, 'x-user-id')

  if (!userId) {
    return null
  }

  try {
    const user = await User.findById(userId).select('-password')
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export const requireAuth = async (event) => {
  const user = await getUserFromHeaders(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'No autenticado. Por favor inicia sesión.'
    })
  }

  return user
}

export const requireAdmin = async (event) => {
  const user = await requireAuth(event)

  if (user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'No tienes permisos de administrador.'
    })
  }

  return user
}