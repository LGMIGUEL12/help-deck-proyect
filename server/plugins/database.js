import { connectDB } from '../utils/database.js'
import { seedDatabase } from '../utils/seed.js'

// Flag para evitar ejecutar múltiples veces
let initialized = false

export default defineNitroPlugin(async (nitroApp) => {
  // Solo ejecutar una vez al inicio
  if (initialized) return

  // No conectar durante el prerender/build
  const isPrerendering = process.env.PRERENDER || import.meta.prerender

  if (isPrerendering) {
    console.log('⏭️ Saltando inicialización de DB durante el prerender')
    return
  }

  // En Netlify Functions, no inicializar aquí, se hace on-demand
  // Esto es porque las funciones serverless se ejecutan en contenedores separados
  if (process.env.NETLIFY) {
    console.log('⏭️ Saltando inicialización de DB en Netlify Functions (on-demand)')
    initialized = true
    return
  }

  try {
    // Conectar a MongoDB al iniciar el servidor (solo en entornos no-serverless)
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