/**
 * Script para inicializar usuarios en MongoDB Atlas
 *
 * Ejecutar:
 * 1. Asegurarte de tener MONGODB_URI configurado en .env
 * 2. Correr: node scripts/init-users.js
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

// Esquema de usuario (duplicado para evitar importar desde server/)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return this.authProvider === 'local'
    }
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  department: {
    type: String,
    trim: true,
    default: ''
  },
  profilePhoto: {
    type: String,
    default: 'https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png'
  },
  jobTitle: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  interests: {
    type: [{
      id: Number,
      name: String,
      icon: String
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

// Usuarios a crear
const users = [
  {
    email: 'admin@disenos.com',
    password: 'Admin123!',
    name: 'Administrador',
    role: 'admin',
    authProvider: 'local',
    department: 'Administración',
    jobTitle: 'Administrador del Sistema'
  },
  {
    email: 'usuario@disenos.com',
    password: 'Usuario123!',
    name: 'Usuario de Prueba',
    role: 'user',
    authProvider: 'local',
    department: 'General',
    jobTitle: 'Usuario'
  }
]

async function initUsers() {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
      console.error('❌ Error: MONGODB_URI no está definido en las variables de entorno')
      console.log('💡 Asegúrate de tener un archivo .env con MONGODB_URI configurado')
      process.exit(1)
    }

    console.log('🔄 Conectando a MongoDB...')
    await mongoose.connect(mongoUri)
    console.log('✅ Conectado a MongoDB:', mongoose.connection.name)

    // Hash de contraseñas y creación de usuarios
    const saltRounds = 12

    for (const userData of users) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email: userData.email })

        if (existingUser) {
          console.log(`⚠️  Usuario ${userData.email} ya existe, saltando...`)
          continue
        }

        // Hash del password
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

        // Crear usuario
        const user = await User.create({
          ...userData,
          password: hashedPassword
        })

        console.log(`✅ Usuario creado: ${user.email} (${user.role})`)
      } catch (error) {
        console.error(`❌ Error al crear usuario ${userData.email}:`, error.message)
      }
    }

    console.log('\n✅ Inicialización completada')
    console.log('\n📋 Usuarios disponibles:')
    console.log('👨‍💼 Administrador:')
    console.log('   Email: admin@disenos.com')
    console.log('   Password: Admin123!')
    console.log('\n👤 Usuario Normal:')
    console.log('   Email: usuario@disenos.com')
    console.log('   Password: Usuario123!')

  } catch (error) {
    console.error('❌ Error en la inicialización:', error.message)
    process.exit(1)
  } finally {
    // Desconectar
    await mongoose.disconnect()
    console.log('\n🔌 Desconectado de MongoDB')
    process.exit(0)
  }
}

// Ejecutar
initUsers()
