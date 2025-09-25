<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @click.self="closeModal"
  >
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

    <!-- Modal content -->
    <div class="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
      <!-- Close button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal header -->
      <div class="text-center mb-6">
        <div class="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Acceso Requerido</h3>
        <p class="text-gray-600">
          Para enviar un ticket necesitas estar logueado. Debes crear un usuario o iniciar sesión para continuar.
        </p>
      </div>

      <!-- Action buttons -->
      <div class="space-y-3">
        <!-- Login button -->
        <NuxtLink to="/login" @click="closeModal" class="block w-full">
          <button class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            Iniciar Sesión
          </button>
        </NuxtLink>

        <!-- Sign up button -->
        <NuxtLink to="/signup" @click="closeModal" class="block w-full">
          <button class="w-full bg-white hover:bg-gray-50 text-teal-600 font-medium py-3 px-4 rounded-lg border border-teal-600 transition-colors duration-200">
            Crear Cuenta
          </button>
        </NuxtLink>

        <!-- Cancel button -->
        <button
          @click="closeModal"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// Close modal on escape key
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>