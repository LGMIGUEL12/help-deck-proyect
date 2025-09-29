<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="flex flex-col fixed h-full z-10 transition-all duration-300" :class="sidebarVisible ? 'w-64' : 'w-16'" style="background-color: #3a5a47;">
      <!-- Header -->
      <div class="p-4 border-b" style="border-color: #5a7a67;">
        <div class="flex items-center justify-between">
          <div v-if="sidebarVisible" class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded flex items-center justify-center" style="background-color: #7db88a;">
              <UIcon name="i-heroicons-user" class="w-5 h-5 text-white" />
            </div>
            <h1 class="text-xl font-semibold text-white">Portal Usuario</h1>
          </div>
          <!-- Botón hamburguesa -->
          <button
            @click="sidebarVisible = !sidebarVisible"
            class="text-gray-300 hover:text-white transition-colors p-1"
            :class="sidebarVisible ? '' : 'mx-auto'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-2 overflow-y-auto">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/home"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Volver al Home' : ''">
              <UIcon name="i-heroicons-home" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Volver al Home</span>
            </NuxtLink>
          </li>
          <li>
            <div
              class="flex items-center rounded-lg text-white"
              style="background-color: #7db88a;"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Mis Tickets' : ''">
              <UIcon name="i-heroicons-ticket" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Mis Tickets</span>
            </div>
          </li>
          <li>
            <NuxtLink to="/historia"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Historia' : ''">
              <UIcon name="i-heroicons-archive-box" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Historia</span>
            </NuxtLink>
          </li>
          <li v-if="user?.role === 'admin'">
            <NuxtLink to="/admin"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Panel de Control' : ''">
              <UIcon name="i-heroicons-squares-plus" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Panel de Control</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Mi Perfil' : ''">
              <UIcon name="i-heroicons-user-circle" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Mi Perfil</span>
            </NuxtLink>
          </li>
          <li v-if="user?.role === 'admin'">
            <NuxtLink to="/users"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Usuarios' : ''">
              <UIcon name="i-heroicons-users" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Usuarios</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- User info and logout -->
      <div class="p-2 border-t" style="border-color: #5a7a67;">
        <div v-if="sidebarVisible" class="flex items-center space-x-3 mb-3 px-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              v-if="user?.profilePhoto"
              :src="user.profilePhoto"
              :alt="user?.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-sm font-medium text-gray-700 uppercase">
              {{ user?.name?.charAt(0) }}
            </span>
          </div>
          <div>
            <div class="text-sm font-medium text-white">{{ user?.name }}</div>
            <div class="text-xs text-gray-300">{{ user?.department }}</div>
          </div>
        </div>
        <div v-else class="flex justify-center mb-3">
          <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              v-if="user?.profilePhoto"
              :src="user.profilePhoto"
              :alt="user?.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-xs font-medium text-gray-700 uppercase">
              {{ user?.name?.charAt(0) }}
            </span>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
          :class="sidebarVisible ? 'w-full px-3 py-2' : 'px-2 py-2 justify-center w-full'"
          :title="!sidebarVisible ? 'Cerrar Sesión' : ''"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
          <span v-if="sidebarVisible">Cerrar Sesión</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="sidebarVisible ? 'ml-64' : 'ml-16'" class="min-h-screen flex flex-col bg-gray-50 transition-all duration-300">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h2 class="text-2xl font-semibold text-gray-900">Mis Tickets</h2>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Create New Ticket Button -->
            <button
              @click="showCreateModal = true"
              class="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              <UIcon name="i-heroicons-plus" class="w-4 h-4" />
              <span>Crear Nuevo Ticket</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 bg-gray-50">
        <!-- Tickets Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Table Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Mis Tickets</h3>
              <p class="text-sm text-gray-500">
                Tienes {{ userTickets.length }} ticket(s) activo(s)
              </p>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Opened
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in userTickets" :key="ticket.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{{ ticket.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-3">
                        <img
                          v-if="getUserById(ticket.userId)?.profilePhoto"
                          :src="getUserById(ticket.userId).profilePhoto"
                          :alt="ticket.user"
                          class="w-full h-full object-cover"
                        />
                        <span v-else class="text-xs font-medium text-gray-700 uppercase">
                          {{ ticket.user?.charAt(0) }}
                        </span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ ticket.subject }}</div>
                        <div class="text-sm text-gray-500">{{ ticket.user }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(ticket.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ ticket.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getPriorityClass(ticket.priority)" class="text-sm font-medium">
                      {{ ticket.priority }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(ticket.dateOpened) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <!-- Solo puede editar si el ticket está Open -->
                    <button
                      v-if="ticket.status === 'Open'"
                      @click="editTicket(ticket)"
                      class="mr-3"
                      style="color: #7db88a;"
                      onmouseover="this.style.color='#6ba378'"
                      onmouseout="this.style.color='#7db88a'"
                    >
                      <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                    </button>
                    <span v-else class="text-gray-400 text-sm">
                      Ticket {{ ticket.status.toLowerCase() }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Create Ticket Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Ticket</h3>
          <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="createTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              v-model="newTicket.subject"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Enter ticket subject"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              v-model="newTicket.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newTicket.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Describe the issue..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white rounded-md transition-colors"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Ticket Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Edit Ticket #{{ selectedTicket?.id }}</h3>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="updateTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              v-model="editTicketData.subject"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Enter ticket subject"
            />
          </div>

          <!-- Campo Status: solo visible para admin -->
          <div v-if="user?.role === 'admin'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="editTicketData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              v-model="editTicketData.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="editTicketData.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Describe the issue..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white rounded-md transition-colors"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { users } from '~/database/users.js'

definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
const { allTickets, addTicket, updateTicket: updateTicketGlobal } = useTickets()

// Reactive data
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedTicket = ref(null)
const sidebarVisible = ref(false)
const newTicket = ref({
  subject: '',
  priority: 'Medium',
  description: ''
})
const editTicketData = ref({
  subject: '',
  priority: 'Medium',
  description: ''
})


// Computed property to show only current user's tickets (excluding closed tickets)
const userTickets = computed(() => {
  return allTickets.value.filter(ticket =>
    ticket.userId === user.value?.id && ticket.status !== 'Closed'
  )
})

// Methods
const getStatusClass = (status) => {
  const classes = {
    'Open': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Closed': 'bg-gray-100 text-gray-800',
    'Pending': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority) => {
  const classes = {
    'Low': 'text-green-600',
    'Medium': 'text-yellow-600',
    'High': 'text-red-600'
  }
  return classes[priority] || 'text-gray-600'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const createTicket = () => {
  const ticketData = {
    subject: newTicket.value.subject,
    userId: user.value?.id || 1,
    user: user.value?.name || 'Current User',
    status: 'Open',
    priority: newTicket.value.priority,
    description: newTicket.value.description
  }

  addTicket(ticketData)

  // Reset form
  newTicket.value = {
    subject: '',
    priority: 'Medium',
    description: ''
  }

  showCreateModal.value = false
}

const editTicket = (ticket) => {
  // Solo puede editar si el ticket está Open
  if (ticket.status !== 'Open') {
    console.warn('Solo puedes editar tickets en estado Open')
    return
  }

  selectedTicket.value = ticket
  editTicketData.value = {
    subject: ticket.subject,
    priority: ticket.priority,
    description: ticket.description
  }
  showEditModal.value = true
}

const updateTicket = () => {
  if (selectedTicket.value) {
    const updates = {
      subject: editTicketData.value.subject,
      priority: editTicketData.value.priority,
      description: editTicketData.value.description
      // Status no se cambia - solo admin puede hacer eso
    }

    updateTicketGlobal(selectedTicket.value.id, updates)
  }
  showEditModal.value = false
  selectedTicket.value = null
}

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

// Función para obtener el usuario completo por ID
const getUserById = (userId) => {
  return users.find(u => u.id === userId)
}
</script>

<style scoped>
/* Estilos personalizados para inputs con tema verde */
.green-focus {
  background-color: white !important;
  color: #374151 !important; /* gray-700 */
}

.green-focus:focus {
  border-color: #7db88a !important;
  background-color: white !important;
  color: #374151 !important;
  --tw-ring-color: #7db88a !important;
  --tw-ring-opacity: 0.5 !important;
  box-shadow: 0 0 0 2px rgba(125, 184, 138, 0.3) !important;
}

/* Override default focus styles */
input.green-focus,
select.green-focus,
textarea.green-focus {
  background-color: white !important;
  color: #374151 !important;
  border-color: #d1d5db; /* gray-300 */
}

input.green-focus:focus,
select.green-focus:focus,
textarea.green-focus:focus {
  outline: none;
  border-color: #7db88a;
  background-color: white !important;
  color: #374151 !important;
  box-shadow: 0 0 0 2px rgba(125, 184, 138, 0.3);
}

/* Placeholder styles */
.green-focus::placeholder {
  color: #9ca3af !important; /* gray-400 */
}

/* Select options styling */
.green-focus option {
  background-color: white !important;
  color: #374151 !important;
}

/* Hover effects para navegación */
.nav-item:hover {
  background-color: #5a7a67 !important;
}
</style>