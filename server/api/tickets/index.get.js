import { Ticket } from '../../models/Ticket.js'
import { connectDB } from '../../utils/database.js'
import { requireAuth } from '../../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Verificar autenticación
    const user = await requireAuth(event)

    // Obtener parámetros de query
    const query = getQuery(event)
    const { status, priority, category } = query

    // Construir filtros
    let filters = {}

    // Si es usuario normal, solo ve sus tickets
    // Si es admin, ve todos los tickets
    if (user.role !== 'admin') {
      filters.createdBy = user._id
    }

    // Filtros opcionales
    if (status) {
      filters.status = status
    }
    if (priority) {
      filters.priority = priority
    }
    if (category) {
      filters.category = category
    }

    // Obtener tickets
    const tickets = await Ticket.find(filters)
      .populate('createdBy', 'name email role department profilePhoto')
      .populate('assignedTo', 'name email role department profilePhoto')
      .sort({ createdAt: -1 }) // Más recientes primero

    return {
      success: true,
      tickets: tickets,
      count: tickets.length,
      userRole: user.role
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Error obteniendo tickets:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al obtener los tickets'
    })
  }
})