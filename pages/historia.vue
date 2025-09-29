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
            <NuxtLink to="/tickets"
              class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Mis Tickets' : ''">
              <UIcon name="i-heroicons-ticket" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Mis Tickets</span>
            </NuxtLink>
          </li>
          <li>
            <div
              class="flex items-center rounded-lg text-white"
              style="background-color: #7db88a;"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Historia' : ''">
              <UIcon name="i-heroicons-archive-box" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Historia</span>
            </div>
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
            <h2 class="text-2xl font-semibold text-gray-900">Historia de Tickets</h2>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              <span v-if="user?.role === 'admin'" class="font-medium text-blue-600">Vista de Administrador</span>
              <span v-else class="font-medium text-green-600">Mis Tickets Resueltos</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 bg-gray-50">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Total Closed Tickets -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-archive-box" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      {{ user?.role === 'admin' ? 'Total Cerrados' : 'Mis Tickets Cerrados' }}
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">{{ closedTickets.length }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- This Month -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-calendar" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Este Mes</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ thisMonthClosed }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Average Resolution Time -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-clock" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Tiempo Promedio</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ averageResolutionTime }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tickets Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Table Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Tickets Resueltos</h3>
                <p class="text-sm text-gray-500">
                  Historial de tickets cerrados{{ user?.role === 'admin' ? ' de todos los usuarios' : '' }}
                </p>
              </div>
              <!-- Filter Options -->
              <div class="flex items-center space-x-4">
                <select
                  v-model="selectedPeriod"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm"
                >
                  <option value="all">Todos los períodos</option>
                  <option value="thisMonth">Este mes</option>
                  <option value="lastMonth">Mes pasado</option>
                  <option value="thisYear">Este año</option>
                </select>
                <select
                  v-if="user?.role === 'admin'"
                  v-model="selectedUser"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 text-sm"
                >
                  <option value="all">Todos los usuarios</option>
                  <option v-for="userOption in uniqueUsers" :key="userOption.id" :value="userOption.id">
                    {{ userOption.name }}
                  </option>
                </select>
              </div>
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
                  <th v-if="user?.role === 'admin'" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Abierto
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Cerrado
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo Resolución
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in filteredTickets" :key="ticket.id" class="hover:bg-gray-50 cursor-pointer" @click="viewTicket(ticket)">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{{ ticket.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ ticket.subject }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ ticket.description }}</div>
                  </td>
                  <td v-if="user?.role === 'admin'" class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8">
                        <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
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
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">{{ ticket.user }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getPriorityClass(ticket.priority)" class="text-sm font-medium">
                      {{ ticket.priority }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(ticket.dateOpened) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(ticket.dateClosed) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ getResolutionTime(ticket) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="filteredTickets.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-archive-box" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No hay tickets cerrados</h3>
              <p class="text-gray-500">
                {{ user?.role === 'admin' ? 'No se encontraron tickets cerrados en el sistema.' : 'Aún no tienes tickets resueltos.' }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal para ver detalles del ticket (solo lectura) -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-6 border-b">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Detalles del Ticket #{{ selectedTicket?.id }}</h3>
            <p class="text-sm text-gray-500 mt-1">Vista de solo lectura - Ticket cerrado</p>
          </div>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <div class="overflow-y-auto max-h-[70vh] p-6">
          <!-- Información básica del ticket -->
          <div class="space-y-6">
            <!-- Subject -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
              <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
                {{ selectedTicket?.subject }}
              </div>
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900 min-h-[100px] whitespace-pre-wrap">
                {{ selectedTicket?.description }}
              </div>
            </div>

            <!-- Grid con información adicional -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Usuario -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Creado por</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mr-3">
                    <img
                      v-if="getUserById(selectedTicket?.userId)?.profilePhoto"
                      :src="getUserById(selectedTicket?.userId).profilePhoto"
                      :alt="selectedTicket?.user"
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="text-xs font-medium text-gray-700 uppercase">
                      {{ selectedTicket?.user?.charAt(0) }}
                    </span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ selectedTicket?.user }}</div>
                    <div class="text-xs text-gray-500">{{ getUserById(selectedTicket?.userId)?.department }}</div>
                  </div>
                </div>
              </div>

              <!-- Prioridad -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  <span :class="getPriorityClass(selectedTicket?.priority)" class="text-sm font-medium">
                    {{ selectedTicket?.priority }}
                  </span>
                </div>
              </div>

              <!-- Fecha de apertura -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de apertura</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
                  {{ formatDate(selectedTicket?.dateOpened) }}
                </div>
              </div>

              <!-- Fecha de cierre -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de cierre</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
                  {{ formatDate(selectedTicket?.dateClosed) }}
                </div>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {{ selectedTicket?.status }}
                  </span>
                </div>
              </div>

              <!-- Tiempo de resolución -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tiempo de resolución</label>
                <div class="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-900">
                  {{ getResolutionTime(selectedTicket) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end items-center p-6 border-t bg-gray-50">
          <button
            @click="closeViewModal"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
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
const { allTickets } = useTickets()

// Sidebar visibility
const sidebarVisible = ref(false)

// Filter states
const selectedPeriod = ref('all')
const selectedUser = ref('all')

// Modal states
const showViewModal = ref(false)
const selectedTicket = ref(null)

// Computed properties for closed tickets
const closedTickets = computed(() => {
  const closed = allTickets.value.filter(ticket => ticket.status === 'Closed')

  // If user is admin, show all closed tickets, otherwise only their own
  if (user.value?.role === 'admin') {
    return closed
  } else {
    return closed.filter(ticket => ticket.userId === user.value?.id)
  }
})

// Get unique users for admin filter
const uniqueUsers = computed(() => {
  const users = new Map()
  allTickets.value.forEach(ticket => {
    if (!users.has(ticket.userId)) {
      users.set(ticket.userId, {
        id: ticket.userId,
        name: ticket.user
      })
    }
  })
  return Array.from(users.values())
})

// Filtered tickets based on selected filters
const filteredTickets = computed(() => {
  let filtered = [...closedTickets.value]

  // Filter by user (admin only)
  if (user.value?.role === 'admin' && selectedUser.value !== 'all') {
    filtered = filtered.filter(ticket => ticket.userId === selectedUser.value)
  }

  // Filter by period
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  switch (selectedPeriod.value) {
    case 'thisMonth':
      filtered = filtered.filter(ticket => {
        const closedDate = new Date(ticket.dateClosed)
        return closedDate.getMonth() === currentMonth && closedDate.getFullYear() === currentYear
      })
      break
    case 'lastMonth':
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
      filtered = filtered.filter(ticket => {
        const closedDate = new Date(ticket.dateClosed)
        return closedDate.getMonth() === lastMonth && closedDate.getFullYear() === lastMonthYear
      })
      break
    case 'thisYear':
      filtered = filtered.filter(ticket => {
        const closedDate = new Date(ticket.dateClosed)
        return closedDate.getFullYear() === currentYear
      })
      break
  }

  // Sort by date closed (most recent first)
  return filtered.sort((a, b) => new Date(b.dateClosed) - new Date(a.dateClosed))
})

// Stats calculations
const thisMonthClosed = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return closedTickets.value.filter(ticket => {
    const closedDate = new Date(ticket.dateClosed)
    return closedDate.getMonth() === currentMonth && closedDate.getFullYear() === currentYear
  }).length
})

const averageResolutionTime = computed(() => {
  if (closedTickets.value.length === 0) return 'N/A'

  const totalDays = closedTickets.value.reduce((sum, ticket) => {
    const opened = new Date(ticket.dateOpened)
    const closed = new Date(ticket.dateClosed)
    const diffTime = Math.abs(closed - opened)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return sum + diffDays
  }, 0)

  const average = Math.round(totalDays / closedTickets.value.length)
  return `${average} días`
})

// Helper functions
const handleLogout = () => {
  logout()
  navigateTo('/login')
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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const getResolutionTime = (ticket) => {
  const opened = new Date(ticket.dateOpened)
  const closed = new Date(ticket.dateClosed)
  const diffTime = Math.abs(closed - opened)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 día'
  if (diffDays < 7) return `${diffDays} días`

  const weeks = Math.floor(diffDays / 7)
  const remainingDays = diffDays % 7

  if (weeks === 1 && remainingDays === 0) return '1 semana'
  if (remainingDays === 0) return `${weeks} semanas`

  return `${weeks}s ${remainingDays}d`
}

// Función para obtener el usuario completo por ID
const getUserById = (userId) => {
  return users.find(u => u.id === userId)
}

// Funciones para manejar el modal de vista
const viewTicket = (ticket) => {
  selectedTicket.value = ticket
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedTicket.value = null
}
</script>

<style scoped>
/* Estilos personalizados para selects con tema verde */
select:focus {
  border-color: #7db88a !important;
  box-shadow: 0 0 0 2px rgba(125, 184, 138, 0.3) !important;
}
</style>