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
    department: 'IT Administration',
    profilePhoto: 'https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'usuario@disenos.com',
    password: 'Usuario123!',
    name: 'Usuario Normal',
    role: ROLES.USER,
    department: 'General',
    profilePhoto: 'https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    email: 'maria.garcia@disenos.com',
    password: 'Maria123!',
    name: 'María García',
    role: ROLES.USER,
    department: 'Marketing',
    profilePhoto: 'https://www.mundopsicologos.com/site/article/62918/52988/la-depresion-cambia-a-las-personas-10-efectos-de-este-trastorno-en-el-comportamiento-y-el-cerebro-0_ai1.jpg',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    email: 'carlos.lopez@disenos.com',
    password: 'Carlos123!',
    name: 'Carlos López',
    role: ROLES.USER,
    department: 'Desarrollo',
    profilePhoto: 'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=',
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