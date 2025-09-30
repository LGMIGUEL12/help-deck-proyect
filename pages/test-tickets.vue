<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Sistema de Tickets - MongoDB</h1>

      <!-- User Info -->
      <div v-if="user" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-2">Usuario Actual</h2>
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rol:</strong> {{ user.role }}</p>
        <p><strong>ID:</strong> {{ user._id }}</p>
      </div>

      <!-- Create Ticket Form -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Crear Nuevo Ticket</h2>
        <form @submit.prevent="handleCreateTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Título</label>
            <input
              v-model="newTicket.title"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              v-model="newTicket.description"
              class="w-full border rounded px-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Prioridad</label>
              <select v-model="newTicket.priority" class="w-full border rounded px-3 py-2">
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Categoría</label>
              <input
                v-model="newTicket.category"
                type="text"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            :disabled="loading"
          >
            {{ loading ? 'Creando...' : 'Crear Ticket' }}
          </button>
        </form>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Filtros</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Estado</label>
            <select v-model="filters.status" @change="loadTickets" class="w-full border rounded px-3 py-2">
              <option value="">Todos</option>
              <option value="open">Abierto</option>
              <option value="in_progress">En Progreso</option>
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Prioridad</label>
            <select v-model="filters.priority" @change="loadTickets" class="w-full border rounded px-3 py-2">
              <option value="">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Categoría</label>
            <input
              v-model="filters.category"
              @change="loadTickets"
              type="text"
              class="w-full border rounded px-3 py-2"
              placeholder="Filtrar por categoría"
            />
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Tickets List -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">
          Mis Tickets ({{ allTickets.length }})
          <span v-if="loading" class="text-sm text-gray-500">Cargando...</span>
        </h2>

        <div v-if="allTickets.length === 0" class="text-center py-8 text-gray-500">
          No hay tickets disponibles
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="ticket in allTickets"
            :key="ticket._id"
            class="border rounded-lg p-4 hover:shadow-md transition"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-green-100 text-green-800': ticket.status === 'open',
                  'bg-yellow-100 text-yellow-800': ticket.status === 'in_progress',
                  'bg-blue-100 text-blue-800': ticket.status === 'resolved',
                  'bg-gray-100 text-gray-800': ticket.status === 'closed'
                }"
              >
                {{ ticket.status }}
              </span>
            </div>

            <p class="text-gray-600 text-sm mb-3">{{ ticket.description }}</p>

            <div class="flex gap-4 text-xs text-gray-500 mb-3">
              <span>Prioridad: <strong>{{ ticket.priority }}</strong></span>
              <span>Categoría: <strong>{{ ticket.category }}</strong></span>
              <span>Creado: {{ formatDate(ticket.createdAt) }}</span>
            </div>

            <div v-if="ticket.createdBy" class="text-xs text-gray-500 mb-3">
              Creado por: {{ ticket.createdBy.name }} ({{ ticket.createdBy.email }})
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="updateStatus(ticket._id, 'in_progress')"
                v-if="ticket.status === 'open'"
                class="text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Iniciar
              </button>
              <button
                @click="updateStatus(ticket._id, 'resolved')"
                v-if="ticket.status === 'in_progress'"
                class="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Resolver
              </button>
              <button
                @click="showCommentModal(ticket)"
                class="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Comentar ({{ ticket.comments?.length || 0 }})
              </button>
            </div>

            <!-- Comments -->
            <div v-if="ticket.comments && ticket.comments.length > 0" class="mt-4 pt-4 border-t">
              <h4 class="text-sm font-semibold mb-2">Comentarios:</h4>
              <div v-for="comment in ticket.comments" :key="comment._id" class="text-xs bg-gray-50 p-2 rounded mb-2">
                <div class="font-semibold">{{ comment.user?.name || 'Usuario' }}</div>
                <div class="text-gray-600">{{ comment.message }}</div>
                <div class="text-gray-400 text-xs mt-1">{{ formatDate(comment.createdAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment Modal -->
      <div
        v-if="commentModal.show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        @click.self="commentModal.show = false"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-semibold mb-4">Agregar Comentario</h3>
          <textarea
            v-model="commentModal.message"
            class="w-full border rounded px-3 py-2 mb-4"
            rows="4"
            placeholder="Escribe tu comentario..."
          ></textarea>
          <div class="flex gap-2">
            <button
              @click="handleAddComment"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              :disabled="loading"
            >
              {{ loading ? 'Enviando...' : 'Enviar' }}
            </button>
            <button
              @click="commentModal.show = false"
              class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()
const { allTickets, loading, error, fetchTickets, createTicket, updateTicket, addComment } = useTickets()

const newTicket = ref({
  title: '',
  description: '',
  priority: 'medium',
  category: 'General'
})

const filters = ref({
  status: '',
  priority: '',
  category: ''
})

const commentModal = ref({
  show: false,
  ticketId: null,
  message: ''
})

// Cargar tickets al montar
onMounted(async () => {
  await loadTickets()
})

const loadTickets = async () => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters.value).filter(([_, v]) => v !== '')
  )
  await fetchTickets(cleanFilters)
}

const handleCreateTicket = async () => {
  const result = await createTicket(newTicket.value)
  if (result.success) {
    // Limpiar formulario
    newTicket.value = {
      title: '',
      description: '',
      priority: 'medium',
      category: 'General'
    }
    alert('Ticket creado exitosamente')
  } else {
    alert('Error al crear ticket: ' + result.error)
  }
}

const updateStatus = async (ticketId, newStatus) => {
  const result = await updateTicket(ticketId, { status: newStatus })
  if (result.success) {
    alert('Estado actualizado')
  } else {
    alert('Error: ' + result.error)
  }
}

const showCommentModal = (ticket) => {
  commentModal.value = {
    show: true,
    ticketId: ticket._id,
    message: ''
  }
}

const handleAddComment = async () => {
  if (!commentModal.value.message.trim()) {
    alert('Por favor escribe un comentario')
    return
  }

  const result = await addComment(commentModal.value.ticketId, commentModal.value.message)
  if (result.success) {
    commentModal.value = {
      show: false,
      ticketId: null,
      message: ''
    }
    alert('Comentario agregado')
  } else {
    alert('Error: ' + result.error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>