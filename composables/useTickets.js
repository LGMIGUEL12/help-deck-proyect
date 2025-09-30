// Composable para manejar tickets con MongoDB
export const useTickets = () => {
  // Estado global de tickets
  const allTickets = useState('tickets', () => [])
  const loading = useState('tickets.loading', () => false)
  const error = useState('tickets.error', () => null)

  // Función para obtener el user ID del localStorage
  const getUserId = () => {
    if (process.client) {
      const user = localStorage.getItem('user')
      if (user) {
        return JSON.parse(user)._id
      }
    }
    return null
  }

  // Función para obtener todos los tickets desde MongoDB
  const fetchTickets = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const userId = getUserId()
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      // Construir query params
      const queryParams = new URLSearchParams(filters).toString()
      const url = `/api/tickets${queryParams ? '?' + queryParams : ''}`

      const data = await $fetch(url, {
        method: 'GET',
        headers: {
          'x-user-id': userId
        }
      })

      if (data.success) {
        allTickets.value = data.tickets
        return data.tickets
      }
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al cargar tickets'
      console.error('Error fetching tickets:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Función para crear un nuevo ticket
  const createTicket = async (ticketData) => {
    loading.value = true
    error.value = null

    try {
      const userId = getUserId()
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const data = await $fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'x-user-id': userId
        },
        body: ticketData
      })

      if (data.success) {
        // Agregar al inicio del array local
        allTickets.value.unshift(data.ticket)
        return { success: true, ticket: data.ticket }
      }
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al crear ticket'
      console.error('Error creating ticket:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Función para obtener un ticket por ID
  const getTicketById = async (ticketId) => {
    loading.value = true
    error.value = null

    try {
      const userId = getUserId()
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const data = await $fetch(`/api/tickets/${ticketId}`, {
        method: 'GET',
        headers: {
          'x-user-id': userId
        }
      })

      if (data.success) {
        return data.ticket
      }
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al obtener ticket'
      console.error('Error getting ticket:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Función para actualizar un ticket
  const updateTicket = async (ticketId, updates) => {
    loading.value = true
    error.value = null

    try {
      const userId = getUserId()
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const data = await $fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'x-user-id': userId
        },
        body: updates
      })

      if (data.success) {
        // Actualizar en el array local
        const index = allTickets.value.findIndex(t => t._id === ticketId)
        if (index !== -1) {
          allTickets.value[index] = data.ticket
        }
        return { success: true, ticket: data.ticket }
      }
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al actualizar ticket'
      console.error('Error updating ticket:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Función para agregar comentario
  const addComment = async (ticketId, message) => {
    loading.value = true
    error.value = null

    try {
      const userId = getUserId()
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const data = await $fetch(`/api/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: {
          'x-user-id': userId
        },
        body: { message }
      })

      if (data.success) {
        // Actualizar ticket en el array local
        const index = allTickets.value.findIndex(t => t._id === ticketId)
        if (index !== -1) {
          allTickets.value[index] = data.ticket
        }
        return { success: true, ticket: data.ticket }
      }
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al agregar comentario'
      console.error('Error adding comment:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Función para actualizar el status de un ticket (helper)
  const updateTicketStatus = async (ticketId, newStatus) => {
    return await updateTicket(ticketId, { status: newStatus })
  }

  // Función para obtener tickets por usuario (computed local)
  const getTicketsByUser = (userId) => {
    return computed(() => allTickets.value.filter(ticket => ticket.createdBy?._id === userId))
  }

  // Función para obtener todos los tickets (computed)
  const getAllTickets = () => {
    return computed(() => allTickets.value)
  }

  // Función para obtener el conteo de tickets por usuario (excluyendo cerrados)
  const getTicketsCountByUser = (userId) => {
    return allTickets.value.filter(
      ticket => ticket.createdBy?._id === userId && ticket.status !== 'closed'
    ).length
  }

  return {
    allTickets: readonly(allTickets),
    loading: readonly(loading),
    error: readonly(error),
    fetchTickets,
    createTicket,
    getTicketById,
    updateTicket,
    updateTicketStatus,
    addComment,
    getTicketsByUser,
    getAllTickets,
    getTicketsCountByUser
  }
}