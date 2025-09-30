import mongoose from 'mongoose'

const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
}

const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descripción es requerida'],
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(TICKET_STATUS),
    default: TICKET_STATUS.OPEN
  },
  priority: {
    type: String,
    enum: Object.values(TICKET_PRIORITY),
    default: TICKET_PRIORITY.MEDIUM
  },
  category: {
    type: String,
    trim: true,
    default: 'General'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  resolvedAt: {
    type: Date,
    default: null
  },
  closedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

// Índices para mejorar búsquedas
ticketSchema.index({ status: 1, priority: 1 })
ticketSchema.index({ createdBy: 1 })
ticketSchema.index({ assignedTo: 1 })

export const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)
export { TICKET_STATUS, TICKET_PRIORITY }