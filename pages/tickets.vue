<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 text-white flex flex-col" style="background-color: #3a4b40">
      <div class="px-8 py-6 border-b" style="border-color: #9db0a3">
        <h1 class="text-2xl font-semibold">Help Desk</h1>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink to="/home"
          class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors hover:bg-[#9db0a3]">
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-3" />
          Home
        </NuxtLink>
        <NuxtLink to="/tickets" class="flex items-center px-4 py-2 text-white rounded-md" style="background-color: #9db0a3">
          <UIcon name="i-heroicons-ticket" class="w-5 h-5 mr-3" />
          Console
        </NuxtLink>
        <a href="#"
          class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors hover:bg-[#9db0a3]">
          <UIcon name="i-heroicons-cog" class="w-5 h-5 mr-3" />
          Setting
        </a>
        <a href="#"
          class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors hover:bg-[#9db0a3]">
          <UIcon name="i-heroicons-user" class="w-5 h-5 mr-3" />
          Ustar
        </a>
        <a href="#"
          class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors hover:bg-[#9db0a3]">
          <UIcon name="i-heroicons-user-group" class="w-5 h-5 mr-3" />
          Uove
        </a>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Help Desk</h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input v-model="searchQuery" placeholder="Search Find"
              class="pl-10 pr-4 py-2 rounded-lg border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              style="background-color: #a8d5ba; width: 250px;" />
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-600" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

    <FormModal
      :is-open="isModalOpen"
      @update:is-open="isModalOpen = $event"
      :title="editingTicket ? 'Edit Ticket' : 'New Ticket'"
      :fields="ticketFields"
      v-model="ticketForm"
      :save-button-label="editingTicket ? 'Update' : 'Create'"
      @cancel="closeModal"
      @save="saveTicket"
    />

    <ConfirmModal
      :is-open="isDeleteModalOpen"
      @update:is-open="isDeleteModalOpen = $event"
      title="Confirm Delete"
      message="Are you sure you want to delete this ticket?"
      confirm-label="Delete"
      @cancel="isDeleteModalOpen = false"
      @confirm="deleteTicket"
    />
    </div>
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

  const statusOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Critical', value: 'Critical' }
  ]

  const ticketFields = [
    { key: 'subject', label: 'Subject', placeholder: 'Enter subject', type: 'input' },
    { key: 'status', label: 'Status', placeholder: 'Select priority', type: 'select', options: statusOptions },
    { key: 'email', label: 'Email', placeholder: 'Enter email', type: 'email' }
  ]

  const isModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const editingTicket = ref(null)
  const ticketToDelete = ref(null)
  const ticketForm = ref({
    subject: '',
    status: 'Low',
    email: ''
  })

  const editTicket = (ticket) => {
    editingTicket.value = ticket
    ticketForm.value = {
      subject: ticket.subject,
      status: ticket.status,
      email: ticket.email || ticket.agent || ''
    }
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    editingTicket.value = null
    ticketForm.value = {
      subject: '',
      status: 'Low',
      email: ''
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