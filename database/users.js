export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

export const users = [
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

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email)
}

export const validateUser = (email, password) => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return { ...user, password: undefined }
  }
  return null
}

export const hasRole = (user, role) => {
  return user && user.role === role
}

export const isAdmin = (user) => {
  return hasRole(user, ROLES.ADMIN)
}

export const isUser = (user) => {
  return hasRole(user, ROLES.USER)
}