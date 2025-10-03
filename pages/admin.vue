<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar currentPage="admin" />

    <!-- Main Content -->
    <div :class="sidebarVisible ? 'ml-64' : 'ml-16'" class="min-h-screen flex flex-col bg-gray-50 transition-all duration-300">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h2 class="text-2xl font-semibold text-gray-900">Panel de Administración</h2>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Bienvenido, {{ user.name }}</span>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 bg-gray-50">
        <!-- Header and Filters Section -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Todos los Tickets</h3>

          <!-- Filters -->
          <div class="bg-white rounded-lg shadow p-4 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Filter by Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por Fecha</label>
                <select
                  v-model="dateFilter"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700"
                  style="focus:ring-color: #7db88a;"
                >
                  <option value="newest">Más recientes primero</option>
                  <option value="oldest">Más antiguos primero</option>
                </select>
              </div>

              <!-- Filter by Priority -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por Prioridad</label>
                <select
                  v-model="priorityFilter"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700"
                  style="focus:ring-color: #7db88a;"
                >
                  <option value="all">Todas las prioridades</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>

              <!-- Filter by Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado</label>
                <select
                  v-model="statusFilter"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white text-gray-700"
                  style="focus:ring-color: #7db88a;"
                >
                  <option value="all">Todos los estados</option>
                  <option value="open">Abierto</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="resolved">Resuelto</option>
                  <option value="closed">Cerrado</option>
                </select>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-600">
                Mostrando <span class="font-semibold">{{ filteredTickets.length }}</span> de <span class="font-semibold">{{ allTickets.length }}</span> tickets
              </p>
            </div>
          </div>
        </div>

        <!-- Tickets Grid -->
        <div v-if="filteredTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket._id"
            @click="openTicketDetailModal(ticket)"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden cursor-pointer hover:scale-[1.02]"
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

            <!-- Card Footer - User Info -->
            <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    v-if="ticket.createdBy?.profilePhoto"
                    :src="ticket.createdBy.profilePhoto"
                    :alt="ticket.createdBy.name"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-xs font-medium text-gray-700 uppercase">
                    {{ ticket.createdBy?.name?.charAt(0) }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-600 truncate">{{ ticket.createdBy?.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow p-12 text-center">
          <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay tickets que coincidan con los filtros</h3>
          <p class="text-sm text-gray-500">Intenta ajustar los filtros para ver más resultados</p>
        </div>
      </main>
    </div>

    <!-- Ticket Detail Modal -->
    <div v-if="showTicketDetailModal && selectedTicket" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">Detalles del Ticket</h3>
            <p class="text-sm text-gray-500">ID: #{{ selectedTicket._id?.slice(-6) }}</p>
          </div>
          <button @click="closeTicketDetailModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Ticket Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
            <h4 class="text-lg font-semibold text-gray-900">{{ selectedTicket.title }}</h4>
          </div>

          <!-- Status Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              :value="selectedTicket.status"
              @change="handleStatusChange(selectedTicket._id, $event.target.value)"
              class="w-full px-4 py-2 text-sm font-semibold rounded-lg border-2 focus:ring-2 cursor-pointer transition-colors"
              :class="getSelectStatusClass(selectedTicket.status)"
              style="focus:ring-color: #7db88a;"
            >
              <option value="open">Abierto</option>
              <option value="in_progress">En Progreso</option>
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          <!-- Priority and Date -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5" :class="getPriorityIconClass(selectedTicket.priority)" />
                <span :class="getPriorityClass(selectedTicket.priority)" class="text-base font-medium uppercase">
                  {{ selectedTicket.priority }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Creación</label>
              <div class="flex items-center space-x-2 text-gray-600">
                <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
                <span class="text-base">{{ formatDate(selectedTicket.createdAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p class="text-gray-700 whitespace-pre-wrap">{{ selectedTicket.description || 'Sin descripción' }}</p>
            </div>
          </div>

          <!-- User Information -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Creado por</label>
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    v-if="selectedTicket.createdBy?.profilePhoto"
                    :src="selectedTicket.createdBy.profilePhoto"
                    :alt="selectedTicket.createdBy.name"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-lg font-medium text-gray-700 uppercase">
                    {{ selectedTicket.createdBy?.name?.charAt(0) }}
                  </span>
                </div>
                <div class="flex-1">
                  <p class="text-base font-semibold text-gray-900">{{ selectedTicket.createdBy?.name }}</p>
                  <p class="text-sm text-gray-600">{{ selectedTicket.createdBy?.email }}</p>
                  <p class="text-xs text-gray-500">{{ selectedTicket.createdBy?.department || 'Sin departamento' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Category (if exists) -->
          <div v-if="selectedTicket.category">
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {{ selectedTicket.category }}
            </span>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            @click="closeTicketDetailModal"
            class="px-6 py-2 text-white rounded-md transition-colors"
            style="background-color: #7db88a;"
            onmouseover="this.style.backgroundColor='#6ba378'"
            onmouseout="this.style.backgroundColor='#7db88a'"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const { user, logout } = useAuth()
const { allTickets, loading, fetchTickets, updateTicket } = useTickets()
const { sidebarVisible } = useSidebar()

// Sidebar visibility

// Filters
const dateFilter = ref('newest')
const priorityFilter = ref('all')
const statusFilter = ref('all')

// Modal state
const showTicketDetailModal = ref(false)
const selectedTicket = ref(null)

// Cargar tickets al montar
onMounted(async () => {
  await fetchTickets()
})


// Computed property para filtrar y ordenar tickets
const filteredTickets = computed(() => {
  let tickets = [...allTickets.value]

  // Filtrar por prioridad
  if (priorityFilter.value !== 'all') {
    tickets = tickets.filter(ticket => ticket.priority === priorityFilter.value)
  }

  // Filtrar por estado
  if (statusFilter.value !== 'all') {
    tickets = tickets.filter(ticket => ticket.status === statusFilter.value)
  }

  // Ordenar por fecha
  tickets.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    if (dateFilter.value === 'newest') {
      return dateB - dateA // Más recientes primero
    } else {
      return dateA - dateB // Más antiguos primero
    }
  })

  return tickets
})

// Función para abrir el modal de detalles
const openTicketDetailModal = (ticket) => {
  selectedTicket.value = ticket
  showTicketDetailModal.value = true
}

// Función para cerrar el modal de detalles
const closeTicketDetailModal = () => {
  showTicketDetailModal.value = false
  selectedTicket.value = null
}

// Función para cambiar el estado de un ticket
const handleStatusChange = async (ticketId, newStatus) => {
  const result = await updateTicket(ticketId, { status: newStatus.toLowerCase() })
  if (result.success) {
    // Actualizar el ticket seleccionado si está en el modal
    if (selectedTicket.value && selectedTicket.value._id === ticketId) {
      selectedTicket.value = { ...selectedTicket.value, status: newStatus.toLowerCase() }
    }
  } else {
    alert('Error al actualizar estado: ' + result.error)
  }
}

// Funciones para estilos de tickets
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

// Función para obtener clases CSS del select según el status
const getSelectStatusClass = (status) => {
  const classes = {
    'open': 'bg-green-100 text-green-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'closed': 'bg-gray-100 text-gray-800',
    'resolved': 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
/* Custom scrollbar styles - light theme */
.max-h-\[90vh\]::-webkit-scrollbar {
  width: 8px;
}

.max-h-\[90vh\]::-webkit-scrollbar-track {
  background: #f3f4f6; /* gray-100 */
  border-radius: 4px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb {
  background: #d1d5db; /* gray-300 */
  border-radius: 4px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb:hover {
  background: #9ca3af; /* gray-400 */
}

/* For Firefox */
.max-h-\[90vh\] {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
</style>