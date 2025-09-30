import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection')
    return
  }

  try {
    const config = useRuntimeConfig()
    const mongoUri = config.mongodbUri || process.env.MONGODB_URI || 'mongodb://localhost:27017/helpdesk_db'

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    isConnected = true
    console.log('✅ MongoDB connected successfully to:', mongoose.connection.name)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    throw error
  }
}

export const disconnectDB = async () => {
  if (!isConnected) {
    return
  }

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log('✅ MongoDB disconnected successfully')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error.message)
    throw error
  }
}

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected')
})