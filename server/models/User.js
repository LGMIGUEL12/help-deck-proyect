import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: function() {
      return this.authProvider === 'local'
    },
    minlength: [6, 'Password debe tener al menos 6 caracteres']
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
    required: [true, 'Nombre es requerido'],
    trim: true
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
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
    type: [
      {
        id: Number,
        name: String,
        icon: String
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  } catch (error) {
    next(error)
  }
})

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Método para obtener usuario sin password
userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  delete user.__v
  return user
}

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export { ROLES }