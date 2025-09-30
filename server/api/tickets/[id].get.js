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

    // Buscar ticket
    const ticket = await Ticket.findById(ticketId)
      .populate('createdBy', 'name email role department profilePhoto')
      .populate('assignedTo', 'name email role department profilePhoto')
      .populate('comments.user', 'name email profilePhoto')

    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: 'Ticket no encontrado'
      })
    }

    // Verificar permisos: usuarios normales solo pueden ver sus propios tickets
    if (user.role !== 'admin' && ticket.createdBy._id.toString() !== user._id.toString()) {
      throw createError({
        statusCode: 403,
        message: 'No tienes permiso para ver este ticket'
      })
    }

    return {
      success: true,
      ticket: ticket
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Error obteniendo ticket:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al obtener el ticket'
    })
  }
})