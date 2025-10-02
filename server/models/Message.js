import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Índices para mejorar búsquedas
messageSchema.index({ conversationId: 1, createdAt: -1 })
messageSchema.index({ sender: 1, recipient: 1 })
messageSchema.index({ recipient: 1, read: 1 })

// Método estático para crear ID de conversación
messageSchema.statics.getConversationId = function(userId1, userId2) {
  const ids = [userId1.toString(), userId2.toString()].sort()
  return ids.join('_')
}

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
