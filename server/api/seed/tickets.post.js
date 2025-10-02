import { seedTickets } from '../../utils/seedTickets.js'

export default defineEventHandler(async (event) => {
  try {
    const result = await seedTickets()

    return {
      success: true,
      message: 'Tickets de prueba creados exitosamente',
      data: result
    }
  } catch (error) {
    console.error('Error al crear tickets de prueba:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al crear tickets de prueba: ' + error.message
    })
  }
})
