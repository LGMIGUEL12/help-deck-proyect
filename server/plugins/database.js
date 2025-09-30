import { connectDB } from '../utils/database.js'
import { seedDatabase } from '../utils/seed.js'

export default defineNitroPlugin(async (nitroApp) => {
  try {
    // Conectar a MongoDB al iniciar el servidor
    await connectDB()

    // Ejecutar seed si es necesario (solo crea usuarios si no existen)
    await seedDatabase()

    console.log('✅ Plugin de base de datos inicializado')
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error.message)
    // No detener el servidor, pero registrar el error
  }
})