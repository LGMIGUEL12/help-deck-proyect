import { connectDB } from '../utils/database.js'
import { seedDatabase } from '../utils/seed.js'

// Flag para evitar ejecutar múltiples veces
let initialized = false

export default defineNitroPlugin(async (nitroApp) => {
  // Solo ejecutar una vez al inicio
  if (initialized) return

  // No conectar durante el prerender/build
  if (process.env.NITRO_PRESET === 'netlify' && !process.env.NETLIFY_DEV) {
    console.log('⏭️ Saltando inicialización de DB durante el build')
    return
  }

  try {
    // Conectar a MongoDB al iniciar el servidor
    await connectDB()

    // Ejecutar seed si es necesario (solo crea usuarios si no existen)
    await seedDatabase()

    initialized = true
    console.log('✅ Plugin de base de datos inicializado')
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message)
    // No detener el servidor, pero registrar el error
  }
})