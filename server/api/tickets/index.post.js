import { Ticket } from '../../models/Ticket.js'
import { connectDB } from '../../utils/database.js'
import { requireAuth } from '../../utils/auth.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Verificar autenticación
    const user = await requireAuth(event)

    const body = await readBody(event)
    const { title, description, priority, category } = body

    // Validar campos requeridos
    if (!title || !description) {
      throw createError({
        statusCode: 400,
        message: 'Título y descripción son requeridos'
      })
    }

    // Crear ticket
    const ticket = new Ticket({
      title,
      description,
      priority: priority || 'medium',
      category: category || 'General',
      createdBy: user._id,
      status: 'open'
    })

    await ticket.save()

    // Popular información del usuario
    await ticket.populate('createdBy', 'name email role department profilePhoto')

    return {
      success: true,
      ticket: ticket,
      message: 'Ticket creado exitosamente'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Error creando ticket:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al crear el ticket'
    })
  }
})