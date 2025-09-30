import { User, ROLES } from '../models/User.js'
import { connectDB } from './database.js'

const initialUsers = [
  {
    email: 'admin@disenos.com',
    password: 'Admin123!',
    name: 'Administrador',
    role: ROLES.ADMIN,
    department: 'IT Administration',
    profilePhoto: 'https://img.freepik.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    email: 'usuario@disenos.com',
    password: 'Usuario123!',
    name: 'Usuario Normal',
    role: ROLES.USER,
    department: 'General',
    profilePhoto: 'https://img.freepik.com/foto-gratis/estilo-vida-emociones-gente-concepto-casual-confiado-agradable-sonriente-mujer-asiatica-brazos-cruzados-pecho-seguro-listo-ayudar-escuchando-companeros-trabajo-participando-conversacion_1258-59335.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    email: 'maria.garcia@disenos.com',
    password: 'Maria123!',
    name: 'María García',
    role: ROLES.USER,
    department: 'Marketing',
    profilePhoto: 'https://www.mundopsicologos.com/site/article/62918/52988/la-depresion-cambia-a-las-personas-10-efectos-de-este-trastorno-en-el-comportamiento-y-el-cerebro-0_ai1.jpg'
  },
  {
    email: 'carlos.lopez@disenos.com',
    password: 'Carlos123!',
    name: 'Carlos López',
    role: ROLES.USER,
    department: 'Desarrollo',
    profilePhoto: 'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg='
  }
]

export const seedDatabase = async () => {
  try {
    await connectDB()

    // Verificar si ya existen usuarios
    const existingUsers = await User.countDocuments()

    if (existingUsers > 0) {
      console.log('⚠️  La base de datos ya tiene usuarios. Seed cancelado.')
      return
    }

    console.log('🌱 Iniciando seed de la base de datos...')

    // Crear usuarios iniciales
    for (const userData of initialUsers) {
      const user = new User(userData)
      await user.save()
      console.log(`✅ Usuario creado: ${user.email} (${user.role})`)
    }

    console.log('🎉 Seed completado exitosamente!')
  } catch (error) {
    console.error('❌ Error en el seed:', error.message)
    throw error
  }
}

// Si se ejecuta directamente este archivo
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}