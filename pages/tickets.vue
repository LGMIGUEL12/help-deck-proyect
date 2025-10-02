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
        <!-- Header Section -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900">Mis Tickets</h3>
          <p class="text-sm text-gray-500">
            Tienes {{ userTickets.length }} ticket(s) activo(s)
          </p>
        </div>

        <!-- Tickets Grid -->
        <div v-if="userTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="ticket in userTickets"
            :key="ticket._id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden"
          >
            <!-- Card Header -->
            <div class="p-4 border-b border-gray-100" style="background-color: #f9fafb;">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-gray-500">
                  #{{ ticket._id?.slice(-6) }}
                </span>
                <span :class="getStatusClass(ticket.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ ticket.status }}
                </span>
              </div>
              <h4 class="text-base font-semibold text-gray-900 line-clamp-2">
                {{ ticket.title }}
              </h4>
            </div>

            <!-- Card Body -->
            <div class="p-4 space-y-3">
              <!-- Description Preview -->
              <div>
                <p class="text-sm text-gray-600 line-clamp-3">
                  {{ ticket.description || 'Sin descripción' }}
                </p>
              </div>

              <!-- Priority and Date -->
              <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4" :class="getPriorityIconClass(ticket.priority)" />
                  <span :class="getPriorityClass(ticket.priority)" class="text-xs font-medium uppercase">
                    {{ ticket.priority }}
                  </span>
                </div>
                <div class="flex items-center space-x-1 text-xs text-gray-500">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                  <span>{{ formatDate(ticket.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-4 py-3 border-t border-gray-100" style="background-color: #f9fafb;">
              <button
                v-if="ticket.status === 'open' && canEditTicket(ticket)"
                @click="editTicket(ticket)"
                class="w-full text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                style="background-color: #7db88a;"
                onmouseover="this.style.backgroundColor='#6ba378'"
                onmouseout="this.style.backgroundColor='#7db88a'"
              >
                <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                <span class="text-sm font-medium">Editar ({{ getTimeRemaining(ticket) }} min)</span>
              </button>
              <button
                v-else-if="ticket.status === 'open' && !canEditTicket(ticket)"
                @click="editTicket(ticket)"
                class="w-full text-gray-500 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <UIcon name="i-heroicons-lock-closed" class="w-4 h-4" />
                <span class="text-sm font-medium">Tiempo de edición expirado</span>
              </button>
              <div v-else class="text-center text-sm text-gray-400 py-2">
                Ticket {{ ticket.status.toLowerCase() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow p-12 text-center">
          <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes tickets activos</h3>
          <p class="text-sm text-gray-500 mb-6">Crea un nuevo ticket para empezar</p>
          <button
            @click="showCreateModal = true"
            class="text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
            style="background-color: #7db88a;"
            onmouseover="this.style.backgroundColor='#6ba378'"
            onmouseout="this.style.backgroundColor='#7db88a'"
          >
            <UIcon name="i-heroicons-plus" class="w-4 h-4" />
            <span>Crear Ticket</span>
          </button>
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              v-model="editTicketData.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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

    <!-- Time Expired Modal -->
    <div v-if="showTimeExpiredModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl">
        <div class="flex flex-col items-center text-center">
          <!-- Icon -->
          <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-clock" class="w-8 h-8 text-red-600" />
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Tiempo de Edición Expirado</h3>

          <!-- Message -->
          <p class="text-gray-600 mb-6">
            El tiempo para editar este ticket ha terminado. Solo puedes editar tickets dentro de los primeros 5 minutos después de su creación.
          </p>

          <!-- Button -->
          <button
            @click="showTimeExpiredModal = false"
            class="px-6 py-2 text-white rounded-md transition-colors"
            style="background-color: #7db88a;"
            onmouseover="this.style.backgroundColor='#6ba378'"
            onmouseout="this.style.backgroundColor='#7db88a'"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
const { allTickets, loading, error, fetchTickets, createTicket: createTicketAPI, updateTicket: updateTicketAPI } = useTickets()

// Reactive data
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showTimeExpiredModal = ref(false)
const selectedTicket = ref(null)
const sidebarVisible = ref(false)
const newTicket = ref({
  subject: '',
  priority: 'medium',
  description: ''
})
const editTicketData = ref({
  subject: '',
  priority: 'medium',
  description: '',
  status: 'open'
})

// Cargar tickets al montar
onMounted(async () => {
  await fetchTickets()
})

// Computed property to show only current user's tickets (excluding closed tickets)
const userTickets = computed(() => {
  return allTickets.value.filter(ticket =>
    ticket.createdBy?._id === user.value?._id && ticket.status !== 'closed'
  )
})

// Methods
const getStatusClass = (status) => {
  const classes = {
    'open': 'bg-green-100 text-green-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'closed': 'bg-gray-100 text-gray-800',
    'resolved': 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority) => {
  const classes = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-red-600',
    'urgent': 'text-red-800'
  }
  return classes[priority] || 'text-gray-600'
}

const getPriorityIconClass = (priority) => {
  const classes = {
    'low': 'text-green-600',
    'medium': 'text-yellow-600',
    'high': 'text-red-600',
    'urgent': 'text-red-800'
  }
  return classes[priority] || 'text-gray-600'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

// Función para verificar si han pasado 5 minutos desde la creación
const canEditTicket = (ticket) => {
  if (!ticket || !ticket.createdAt) return false

  const createdAt = new Date(ticket.createdAt)
  const now = new Date()
  const diffInMinutes = (now - createdAt) / (1000 * 60)

  return diffInMinutes <= 5
}

// Función para obtener el tiempo restante
const getTimeRemaining = (ticket) => {
  if (!ticket || !ticket.createdAt) return 0

  const createdAt = new Date(ticket.createdAt)
  const now = new Date()
  const diffInMinutes = (now - createdAt) / (1000 * 60)
  const remaining = Math.max(0, 5 - diffInMinutes)

  return Math.ceil(remaining)
}

const createTicket = async () => {
  const ticketData = {
    title: newTicket.value.subject,
    description: newTicket.value.description,
    priority: newTicket.value.priority,
    category: 'General'
  }

  const result = await createTicketAPI(ticketData)

  if (result.success) {
    // Reset form
    newTicket.value = {
      subject: '',
      priority: 'medium',
      description: ''
    }
    showCreateModal.value = false
  } else {
    alert('Error al crear ticket: ' + result.error)
  }
}

const editTicket = (ticket) => {
  // Verificar si han pasado 5 minutos desde la creación
  if (!canEditTicket(ticket)) {
    showTimeExpiredModal.value = true
    return
  }

  // Solo puede editar si el ticket está Open
  if (ticket.status !== 'open') {
    console.warn('Solo puedes editar tickets en estado Abierto')
    return
  }

  selectedTicket.value = ticket
  editTicketData.value = {
    subject: ticket.title,
    priority: ticket.priority,
    description: ticket.description,
    status: ticket.status
  }
  showEditModal.value = true
}

const updateTicket = async () => {
  if (selectedTicket.value) {
    const updates = {
      title: editTicketData.value.subject,
      priority: editTicketData.value.priority,
      description: editTicketData.value.description
    }

    // Solo agregar status si el usuario es admin
    if (user.value?.role === 'admin' && editTicketData.value.status) {
      updates.status = editTicketData.value.status
    }

    const result = await updateTicketAPI(selectedTicket.value._id, updates)

    if (!result.success) {
      alert('Error al actualizar ticket: ' + result.error)
    }
  }
  showEditModal.value = false
  selectedTicket.value = null
}

const handleLogout = () => {
  logout()
  navigateTo('/login')
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