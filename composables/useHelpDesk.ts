export const useHelpDesk = () => {
  const tickets = ref([
    { id: '10001', subject: '240', status: '232', agent: 'Article Title 300421' },
    { id: '300002', subject: 'Pratus 303', status: 'Totuns 233', agent: 'Knowledge Agent 500411' }
  ])

  const knowledgeBase = ref([
    { id: '30014', subject: '224', status: '233', team: 'Article Tiestas 300424' },
    { id: '20014', subject: 'Prapkin 031', status: 'Fotuns 221', team: 'Knowledge Agent 300403' },
    { id: '20044', subject: 'Article 230', status: 'Turw 231', team: 'Article Title 500442' }
  ])

  const searchQuery = ref('')

  const filteredTickets = computed(() => {
    if (!searchQuery.value) return tickets.value

    const query = searchQuery.value.toLowerCase()
    return tickets.value.filter(ticket =>
      ticket.id.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query) ||
      ticket.status.toLowerCase().includes(query) ||
      ticket.agent.toLowerCase().includes(query)
    )
  })

  const filteredKnowledge = computed(() => {
    if (!searchQuery.value) return knowledgeBase.value

    const query = searchQuery.value.toLowerCase()
    return knowledgeBase.value.filter(item =>
      item.id.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.team.toLowerCase().includes(query)
    )
  })

  const addTicket = (ticket) => {
    const newId = String(Math.max(...tickets.value.map(t => parseInt(t.id)), 0) + 1)
    tickets.value.unshift({ ...ticket, id: newId })
  }

  const updateTicket = (id, updates) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tickets.value[index] = { ...tickets.value[index], ...updates }
    }
  }

  const deleteTicket = (id) => {
    tickets.value = tickets.value.filter(t => t.id !== id)
  }

  const addKnowledge = (item) => {
    const newId = String(Math.max(...knowledgeBase.value.map(k => parseInt(k.id)), 0) + 1)
    knowledgeBase.value.unshift({ ...item, id: newId })
  }

  const updateKnowledge = (id, updates) => {
    const index = knowledgeBase.value.findIndex(k => k.id === id)
    if (index !== -1) {
      knowledgeBase.value[index] = { ...knowledgeBase.value[index], ...updates }
    }
  }

  const deleteKnowledge = (id) => {
    knowledgeBase.value = knowledgeBase.value.filter(k => k.id !== id)
  }

  return {
    tickets,
    knowledgeBase,
    searchQuery,
    filteredTickets,
    filteredKnowledge,
    addTicket,
    updateTicket,
    deleteTicket,
    addKnowledge,
    updateKnowledge,
    deleteKnowledge
  }
}