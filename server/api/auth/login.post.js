// Datos de usuarios (en un proyecto real esto estaría en una base de datos)
const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

const users = [
  {
    id: 1,
    email: 'admin@disenos.com',
    password: 'Admin123!',
    name: 'Administrador',
    role: ROLES.ADMIN,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'usuario@disenos.com',
    password: 'Usuario123!',
    name: 'Usuario Normal',
    role: ROLES.USER,
    createdAt: new Date().toISOString()
  }
]

const findUserByEmail = (email) => {
  return users.find(user => user.email === email)
}

const validateUser = (email, password) => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return { ...user, password: undefined }
  }
  return null
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email y contraseña son requeridos'
    })
  }

  const user = validateUser(email, password)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales inválidas'
    })
  }

  return {
    success: true,
    user: user,
    message: 'Login exitoso'
  }
})