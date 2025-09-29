// Importar datos de usuarios desde el archivo de base de datos
import { users, validateUser } from '~/database/users.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email y contraseña son requeridos'
    })
  }

  const user = validateUser(email, password)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Credenciales inválidas'
    })
  }

  return {
    success: true,
    user: user,
    message: 'Login exitoso'
  }
})