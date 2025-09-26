// Composable para manejar tickets de forma centralizada
export const useTickets = () => {
  // Estado global de tickets
  const allTickets = useState('tickets', () => [
    {
      id: '001',
      subject: 'Cannot log in to portal',
      userId: 2,
      user: 'Usuario Normal',
      status: 'Open',
      priority: 'Medium',
      dateOpened: new Date('2025-09-26'),
      description: 'User unable to access the portal with correct credentials'
    },
    {
      id: '002',
      subject: 'Printer not responding',
      userId: 3,
      user: 'María García',
      status: 'In Progress',
      priority: 'High',
      dateOpened: new Date('2025-09-25'),
      description: 'Office printer not responding to print jobs from Marketing department'
    },
    {
      id: '003',
      subject: 'Software installation issue',
      userId: 4,
      user: 'Carlos López',
      status: 'Closed',
      priority: 'Low',
      dateOpened: new Date('2025-09-24'),
      description: 'Need help installing development tools for new project'
    },
    {
      id: '004',
      subject: 'Password reset request',
      userId: 2,
      user: 'Usuario Normal',
      status: 'Pending',
      priority: 'Medium',
      dateOpened: new Date('2025-09-23'),
      description: 'User requesting password reset for email account'
    },
    {
      id: '005',
      subject: 'VPN connection issues',
      userId: 3,
      user: 'María García',
      status: 'Open',
      priority: 'High',
      dateOpened: new Date('2025-09-22'),
      description: 'Cannot connect to company VPN from home office'
    },
    {
      id: '006',
      subject: 'Database access problem',
      userId: 4,
      user: 'Carlos López',
      status: 'In Progress',
      priority: 'High',
      dateOpened: new Date('2025-09-21'),
      description: 'Unable to access development database for testing'
    },
    {
      id: '007',
      subject: 'Email not syncing',
      userId: 3,
      user: 'María García',
      status: 'Closed',
      priority: 'Medium',
      dateOpened: new Date('2025-09-20'),
      description: 'Marketing team emails not syncing properly with mobile device'
    },
    {
      id: '008',
      subject: 'Server maintenance request',
      userId: 4,
      user: 'Carlos López',
      status: 'Open',
      priority: 'Low',
      dateOpened: new Date('2025-09-19'),
      description: 'Request scheduled maintenance for development server'
    }
  ])

  // Función para actualizar el status de un ticket
  const updateTicketStatus = (ticketId, newStatus) => {
    const ticketIndex = allTickets.value.findIndex(t => t.id === ticketId)
    if (ticketIndex !== -1) {
      allTickets.value[ticketIndex].status = newStatus
    }
  }

  // Función para agregar un nuevo ticket
  const addTicket = (ticketData) => {
    const nextId = String(allTickets.value.length + 1).padStart(3, '0')
    const newTicket = {
      id: nextId,
      ...ticketData,
      dateOpened: new Date()
    }
    allTickets.value.unshift(newTicket)
    return newTicket
  }

  // Función para obtener tickets por usuario
  const getTicketsByUser = (userId) => {
    return computed(() => allTickets.value.filter(ticket => ticket.userId === userId))
  }

  // Función para obtener todos los tickets
  const getAllTickets = () => {
    return computed(() => allTickets.value)
  }

  // Función para obtener el conteo de tickets por usuario
  const getTicketsCountByUser = (userId) => {
    return allTickets.value.filter(ticket => ticket.userId === userId).length
  }

  // Función para actualizar un ticket completo
  const updateTicket = (ticketId, updates) => {
    const ticketIndex = allTickets.value.findIndex(t => t.id === ticketId)
    if (ticketIndex !== -1) {
      allTickets.value[ticketIndex] = {
        ...allTickets.value[ticketIndex],
        ...updates
      }
    }
  }

  return {
    allTickets: readonly(allTickets),
    updateTicketStatus,
    addTicket,
    getTicketsByUser,
    getAllTickets,
    getTicketsCountByUser,
    updateTicket
  }
}