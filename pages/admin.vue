<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Bienvenido, {{ user.name }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Users Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-4.5 4 4 0 018 4.5z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ totalUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Users Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Administradores</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ adminUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Regular Users Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Usuarios Regulares</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ regularUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Lista de Usuarios</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Gestión de usuarios del sistema</p>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="user in usersList" :key="user.id" class="px-4 py-4 sm:px-6">
            <div
              class="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
              @click="viewUserTickets(user)"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700 uppercase">
                      {{ user.name.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                  <div class="text-xs text-gray-400">{{ user.department }}</div>
                  <div class="text-xs" style="color: #7db88a;">{{ getUserTicketsCount(user.id) }} ticket(s)</div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ user.role === 'admin' ? 'Administrador' : 'Usuario' }}
                </span>
                <div class="text-sm text-gray-500">
                  {{ new Date(user.createdAt).toLocaleDateString() }}
                </div>
                <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modal para mostrar tickets del usuario -->
      <div v-if="showUserTicketsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg w-full max-w-4xl mx-auto max-h-[80vh] overflow-hidden">
          <div class="flex justify-between items-center p-6 border-b">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Tickets de {{ selectedUser?.name }}</h3>
              <p class="text-sm text-gray-500">{{ selectedUserTickets.length }} ticket(s) encontrado(s)</p>
            </div>
            <button @click="closeUserTicketsModal" class="text-gray-400 hover:text-gray-600">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="overflow-y-auto max-h-[60vh]">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in selectedUserTickets" :key="ticket.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{{ ticket.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ ticket.subject }}</div>
                    <div class="text-sm text-gray-500">{{ ticket.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select
                      :value="ticket.status"
                      @change="updateTicketStatus(ticket, $event.target.value)"
                      class="text-xs font-semibold rounded-md border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer px-2 py-1"
                      :class="getSelectStatusClass(ticket.status)"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getPriorityClass(ticket.priority)" class="text-sm font-medium">
                      {{ ticket.priority }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(ticket.dateOpened) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="selectedUserTickets.length === 0" class="text-center py-8">
              <p class="text-gray-500">Este usuario no ha creado ningún ticket aún.</p>
            </div>
          </div>

          <div class="flex justify-between items-center p-6 border-t bg-gray-50">
            <div v-if="Object.keys(ticketChanges).length > 0" class="text-sm text-yellow-600">
              <span class="font-medium">{{ Object.keys(ticketChanges).length }}</span> cambio(s) pendiente(s)
            </div>
            <div v-else></div>
            <div class="flex space-x-3">
              <button
                v-if="Object.keys(ticketChanges).length > 0"
                @click="saveTicketChanges"
                class="px-4 py-2 text-white rounded-md transition-colors"
                style="background-color: #7db88a;"
                onmouseover="this.style.backgroundColor='#6ba378'"
                onmouseout="this.style.backgroundColor='#7db88a'"
              >
                Guardar Cambios
              </button>
              <button
                @click="closeUserTicketsModal"
                class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const { user, logout } = useAuth()
const { allTickets, updateTicketStatus: updateTicketStatusGlobal, getTicketsCountByUser } = useTickets()

// Estado para el modal de tickets
const showUserTicketsModal = ref(false)
const selectedUser = ref(null)
const selectedUserTickets = ref([])
const ticketChanges = ref({})

// Datos de usuarios actualizados
const usersList = ref([
  {
    id: 1,
    email: 'admin@disenos.com',
    name: 'Administrador',
    role: 'admin',
    department: 'IT Administration',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'usuario@disenos.com',
    name: 'Usuario Normal',
    role: 'user',
    department: 'General',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    email: 'maria.garcia@disenos.com',
    name: 'María García',
    role: 'user',
    department: 'Marketing',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    email: 'carlos.lopez@disenos.com',
    name: 'Carlos López',
    role: 'user',
    department: 'Desarrollo',
    createdAt: new Date().toISOString()
  }
])
const totalUsers = computed(() => usersList.value.length)
const adminUsers = computed(() => usersList.value.filter(u => u.role === 'admin').length)
const regularUsers = computed(() => usersList.value.filter(u => u.role === 'user').length)

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

// Funciones para manejo de tickets por usuario
const getUserTicketsCount = (userId) => {
  return getTicketsCountByUser(userId)
}

const viewUserTickets = (userToView) => {
  selectedUser.value = userToView
  selectedUserTickets.value = allTickets.value.filter(ticket => ticket.userId === userToView.id)
  showUserTicketsModal.value = true
}

const closeUserTicketsModal = () => {
  showUserTicketsModal.value = false
  selectedUser.value = null
  selectedUserTickets.value = []
  ticketChanges.value = {} // Limpiar cambios pendientes al cerrar
}

// Funciones para estilos de tickets
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
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Función para marcar cambios en tickets (sin guardar aún)
const updateTicketStatus = (ticket, newStatus) => {
  // Guardar el cambio pendiente
  ticketChanges.value[ticket.id] = newStatus

  // Actualizar visualmente en la lista filtrada del modal
  const modalTicketIndex = selectedUserTickets.value.findIndex(t => t.id === ticket.id)
  if (modalTicketIndex !== -1) {
    selectedUserTickets.value[modalTicketIndex].status = newStatus
  }
}

// Función para guardar todos los cambios acumulados
const saveTicketChanges = () => {
  Object.keys(ticketChanges.value).forEach(ticketId => {
    const newStatus = ticketChanges.value[ticketId]
    updateTicketStatusGlobal(ticketId, newStatus)
  })

  // Limpiar cambios pendientes
  ticketChanges.value = {}

  // Mostrar mensaje de confirmación (opcional)
  console.log('Cambios guardados exitosamente')
}

// Función para obtener clases CSS del select según el status
const getSelectStatusClass = (status) => {
  const classes = {
    'Open': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Closed': 'bg-gray-100 text-gray-800',
    'Pending': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>