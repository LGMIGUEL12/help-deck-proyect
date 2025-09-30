import { Ticket } from '../../../models/Ticket.js'
import { connectDB } from '../../../utils/database.js'
import { requireAuth } from '../../../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Verificar autenticación
    const user = await requireAuth(event)

    // Obtener ID del ticket
    const ticketId = getRouterParam(event, 'id')

    if (!ticketId) {
      throw createError({
        statusCode: 400,
        message: 'ID del ticket es requerido'
      })
    }

    const body = await readBody(event)
    const { message } = body

    if (!message || !message.trim()) {
      throw createError({
        statusCode: 400,
        message: 'El mensaje del comentario es requerido'
      })
    }

    // Buscar ticket
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: 'Ticket no encontrado'
      })
    }

    // Verificar permisos: solo el creador o admin pueden comentar
    const isOwner = ticket.createdBy.toString() === user._id.toString()
    const isAdmin = user.role === 'admin'
    const isAssigned = ticket.assignedTo && ticket.assignedTo.toString() === user._id.toString()

    if (!isOwner && !isAdmin && !isAssigned) {
      throw createError({
        statusCode: 403,
        message: 'No tienes permiso para comentar en este ticket'
      })
    }

    // Agregar comentario
    ticket.comments.push({
      user: user._id,
      message: message.trim(),
      createdAt: new Date()
    })

    await ticket.save()

    // Popular información del ticket actualizado
    await ticket.populate('createdBy', 'name email role department profilePhoto')
    await ticket.populate('assignedTo', 'name email role department profilePhoto')
    await ticket.populate('comments.user', 'name email profilePhoto')

    return {
      success: true,
      ticket: ticket,
      message: 'Comentario agregado exitosamente'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Error agregando comentario:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al agregar el comentario'
    })
  }
})