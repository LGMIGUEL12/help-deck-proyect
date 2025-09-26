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
    department: 'IT Administration',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'usuario@disenos.com',
    password: 'Usuario123!',
    name: 'Usuario Normal',
    role: ROLES.USER,
    department: 'General',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    email: 'maria.garcia@disenos.com',
    password: 'Maria123!',
    name: 'María García',
    role: ROLES.USER,
    department: 'Marketing',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    email: 'carlos.lopez@disenos.com',
    password: 'Carlos123!',
    name: 'Carlos López',
    role: ROLES.USER,
    department: 'Desarrollo',
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