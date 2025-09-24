<template>
  <div>
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Help Desk</h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input v-model="searchQuery" placeholder="Search Find" class="pl-10 pr-4 py-2 rounded-lg border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300" style="background-color: #a8d5ba; width: 250px;" />
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <UButton style="background-color: #4CAF50; color: white" @click="isModalOpen = true">New Ticket</UButton>
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
        </div>
      </div>
    </header>
    <main class="flex-1 p-6">
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4" style="color: black">Open Tickets</h2>
        <div class="bg-white rounded-lg shadow">
          <UTable :rows="filteredTickets" :columns="ticketColumns"
            :ui="{ td: { base: 'text-black !important' }, th: { base: 'text-black !important' }, tbody: 'divide-y divide-gray-200', thead: 'border-b border-gray-200' }">
            <template #agent-data="{ row }">
              <div class="flex gap-2">
                <UButton size="xs" style="background-color: #4FC3F7; color: white" @click="editTicket(row)">Edit
                </UButton>
                <UButton size="xs" style="background-color: #EF5350; color: white" @click="confirmDelete(row.id)">Delete
                </UButton>
              </div>
            </template>
          </UTable>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4 " style="color:black">Knowledge Base</h2>
        <div class="bg-white rounded-lg shadow">
          <UTable :rows="filteredKnowledge" :columns="knowledgeColumns"
            :ui="{ td: { base: 'text-black !important' }, th: { base: 'text-black !important' }, tbody: 'divide-y divide-gray-200', thead: 'border-b border-gray-200' }" />
        </div>
      </div>
    </main>

    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-lg', padding: 'p-0' }">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-2xl font-bold text-black mb-6">{{ editingTicket ? 'Edit Ticket' : 'New Ticket' }}</h2>

        <div class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-black mb-2">Subject</label>
            <input v-model="ticketForm.subject" placeholder="Enter subject" class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-black mb-2">Status</label>
            <input v-model="ticketForm.status" placeholder="Enter status" class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-black mb-2">Agent</label>
            <input v-model="ticketForm.agent" placeholder="Enter agent" class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400" />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton style="background-color: #e0e0e0; color: black" size="lg" @click="closeModal">Cancel</UButton>
          <UButton style="background-color: #4CAF50; color: white" size="lg" @click="saveTicket">{{ editingTicket ?
            'Update'
            : 'Create' }}</UButton>
        </div>
      </div>
    </UModal>

    <UModal v-model="isDeleteModalOpen" :ui="{ width: 'sm:max-w-lg', padding: 'p-0' }">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-2xl font-bold text-black mb-4">Confirm Delete</h2>
        <p class="text-black mb-6">Are you sure you want to delete this ticket?</p>

        <div class="flex justify-end gap-3">
          <UButton style="background-color: #e0e0e0; color: black" size="lg" @click="isDeleteModalOpen = false">Cancel
          </UButton>
          <UButton style="background-color: #EF5350; color: white" size="lg" @click="deleteTicket">Delete</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
  const {
    searchQuery,
    filteredTickets,
    filteredKnowledge,
    addTicket,
    updateTicket,
    deleteTicket: removeTicket
  } = useHelpDesk()

  const ticketColumns = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status' },
    { key: 'agent', label: 'Article Agent' }
  ]

  const knowledgeColumns = [
    { key: 'id', label: 'Ticket Title' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Turw' },
    { key: 'team', label: 'Article Tiam' }
  ]

  const isModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const editingTicket = ref(null)
  const ticketToDelete = ref(null)
  const ticketForm = ref({
    subject: '',
    status: '',
    agent: ''
  })

  const editTicket = (ticket) => {
    editingTicket.value = ticket
    ticketForm.value = {
      subject: ticket.subject,
      status: ticket.status,
      agent: ticket.agent
    }
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    editingTicket.value = null
    ticketForm.value = {
      subject: '',
      status: '',
      agent: ''
    }
  }

  const saveTicket = () => {
    if (editingTicket.value) {
      updateTicket(editingTicket.value.id, ticketForm.value)
    } else {
      addTicket(ticketForm.value)
    }
    closeModal()
  }

  const confirmDelete = (id) => {
    ticketToDelete.value = id
    isDeleteModalOpen.value = true
  }

  const deleteTicket = () => {
    if (ticketToDelete.value) {
      removeTicket(ticketToDelete.value)
      ticketToDelete.value = null
      isDeleteModalOpen.value = false
    }
  }
</script>
