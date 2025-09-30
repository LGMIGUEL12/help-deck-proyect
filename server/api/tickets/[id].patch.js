import { Ticket } from '../../models/Ticket.js'
import { connectDB } from '../../utils/database.js'
import { requireAuth } from '../../utils/auth.js'

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
    const { status, priority, category, assignedTo } = body

    // Buscar ticket
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: 'Ticket no encontrado'
      })
    }

    // Verificar permisos
    const isOwner = ticket.createdBy.toString() === user._id.toString()
    const isAdmin = user.role === 'admin'

    if (!isOwner && !isAdmin) {
      throw createError({
        statusCode: 403,
        message: 'No tienes permiso para actualizar este ticket'
      })
    }

    // Actualizar campos permitidos
    if (status) {
      ticket.status = status

      // Actualizar timestamps según el estado
      if (status === 'resolved') {
        ticket.resolvedAt = new Date()
      }
      if (status === 'closed') {
        ticket.closedAt = new Date()
      }
    }

    if (priority) {
      ticket.priority = priority
    }

    if (category) {
      ticket.category = category
    }

    // Solo admins pueden asignar tickets
    if (assignedTo !== undefined && isAdmin) {
      ticket.assignedTo = assignedTo
    }

    await ticket.save()

    // Popular información
    await ticket.populate('createdBy', 'name email role department profilePhoto')
    await ticket.populate('assignedTo', 'name email role department profilePhoto')

    return {
      success: true,
      ticket: ticket,
      message: 'Ticket actualizado exitosamente'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Error actualizando ticket:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al actualizar el ticket'
    })
  }
})