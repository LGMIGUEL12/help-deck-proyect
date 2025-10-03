<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Generador de Tickets de Prueba</h1>
        <p class="text-gray-600">Crea múltiples tickets de prueba con diferentes usuarios, fechas y estados</p>
      </div>

      <!-- Status Messages -->
      <div v-if="message" class="mb-6 p-4 rounded-lg" :class="messageClass">
        <p class="font-medium">{{ message }}</p>
      </div>

      <!-- Summary -->
      <div v-if="summary" class="mb-6 bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumen de Tickets Creados</h3>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-white rounded p-4 border border-gray-200">
            <p class="text-sm text-gray-600 mb-1">Total de Tickets</p>
            <p class="text-2xl font-bold text-green-600">{{ summary.count }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Por Estado -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Por Estado:</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div v-for="(count, status) in summary.summary.byStatus" :key="status"
                   class="bg-white rounded p-3 border border-gray-200">
                <p class="text-xs text-gray-600 capitalize">{{ status }}</p>
                <p class="text-lg font-semibold" :class="getStatusColor(status)">{{ count }}</p>
              </div>
            </div>
          </div>

          <!-- Por Prioridad -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Por Prioridad:</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div v-for="(count, priority) in summary.summary.byPriority" :key="priority"
                   class="bg-white rounded p-3 border border-gray-200">
                <p class="text-xs text-gray-600 capitalize">{{ priority }}</p>
                <p class="text-lg font-semibold" :class="getPriorityColor(priority)">{{ count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Card -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-blue-900 mb-1">Información</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Se crearán 15 tickets de prueba</li>
              <li>• Con diferentes usuarios, fechas (últimos 60 días), prioridades y estados</li>
              <li>• Los tickets se asignarán aleatoriamente a usuarios existentes</li>
              <li>• Algunos tickets estarán cerrados/resueltos con fechas de cierre</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button
          @click="generateTickets"
          :disabled="loading"
          class="flex-1 px-6 py-3 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style="background-color: #7db88a;"
          :style="!loading ? '' : 'background-color: #9ca3af !important'"
          onmouseover="if (!this.disabled) this.style.backgroundColor='#6ba378'"
          onmouseout="if (!this.disabled) this.style.backgroundColor='#7db88a'"
        >
          <span v-if="!loading">Generar Tickets de Prueba</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </span>
        </button>

        <NuxtLink
          to="/tickets"
          class="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
        >
          Ver Tickets
        </NuxtLink>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <NuxtLink to="/home" class="text-sm text-gray-600 hover:text-gray-900">
          ← Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const message = ref('')
const messageClass = ref('')
const summary = ref(null)

const generateTickets = async () => {
  loading.value = true
  message.value = ''
  summary.value = null

  try {
    const response = await $fetch('/api/seed/tickets', {
      method: 'POST'
    })

    if (response.success) {
      message.value = response.message
      messageClass.value = 'bg-green-100 border border-green-200 text-green-800'
      summary.value = response.data
    }
  } catch (error) {
    message.value = 'Error al generar tickets: ' + (error.data?.message || error.message)
    messageClass.value = 'bg-red-100 border border-red-200 text-red-800'
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status) => {
  const colors = {
    open: 'text-green-600',
    in_progress: 'text-blue-600',
    resolved: 'text-purple-600',
    closed: 'text-gray-600'
  }
  return colors[status] || 'text-gray-600'
}

const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600'
  }
  return colors[priority] || 'text-gray-600'
}
</script>
