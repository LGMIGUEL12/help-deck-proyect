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
            <div
              class="flex items-center rounded-lg text-white"
              style="background-color: #7db88a;"
              :class="sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center'"
              :title="!sidebarVisible ? 'Mi Perfil' : ''">
              <UIcon name="i-heroicons-user-circle" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
              <span v-if="sidebarVisible">Mi Perfil</span>
            </div>
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
            <h2 class="text-2xl font-semibold text-gray-900">Mi Perfil</h2>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 bg-gray-50 flex items-center justify-center">
        <!-- Profile Card -->
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <!-- Profile Picture -->
          <div class="flex flex-col items-center mb-6">
            <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 overflow-hidden">
              <img
                v-if="user?.profilePhoto"
                :src="user.profilePhoto"
                :alt="user?.name"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-2xl font-medium text-gray-700 uppercase">
                {{ user?.name?.charAt(0) }}
              </span>
            </div>

            <!-- Name and Title -->
            <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ user?.name || 'Usuario' }}</h3>
            <p class="text-gray-600 text-sm">{{ user?.jobTitle || 'Software Engineer' }}</p>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h4 class="text-lg font-medium text-gray-900 mb-3">Contacto</h4>

            <!-- Phone -->
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-gray-400" />
              <div>
                <p class="text-sm text-gray-600">Phone:</p>
                <p class="text-sm font-medium text-gray-900">{{ user?.phone || '+1 (555) 123-4567' }}</p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-400" />
              <div>
                <p class="text-sm text-gray-600">Email:</p>
                <p class="text-sm font-medium text-gray-900">{{ user?.email || 'jane.doe@example.com' }}</p>
              </div>
            </div>

            <!-- Address -->
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-400" />
              <div>
                <p class="text-sm text-gray-600">Address:</p>
                <p class="text-sm font-medium text-gray-900">{{ user?.address || '123 Main Street, Anytown, USA' }}</p>
              </div>
            </div>
          </div>

          <!-- Interests Section -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-lg font-medium text-gray-900 mb-3">Intereses</h4>
            <div class="space-y-2">
              <div v-for="interest in userInterests" :key="interest.id" class="flex items-center space-x-2">
                <UIcon :name="interest.icon" class="w-4 h-4 text-gray-400" />
                <span class="text-sm text-gray-600">{{ interest.name }}</span>
              </div>
              <div v-if="userInterests.length === 0" class="text-sm text-gray-500 italic">
                No hay intereses agregados
              </div>
            </div>
          </div>

          <!-- Edit Profile Button -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <button
              @click="showEditModal = true"
              class="w-full text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-medium text-gray-900">Editar Perfil</h3>
          <button @click="cancelEdit" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="saveProfile" class="space-y-6">
          <!-- Profile Picture Section -->
          <div class="flex flex-col items-center mb-6">
            <div class="relative">
              <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  v-if="editForm.profilePhoto"
                  :src="editForm.profilePhoto"
                  :alt="editForm.name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-2xl font-medium text-gray-700 uppercase">
                  {{ editForm.name?.charAt(0) }}
                </span>
              </div>
              <!-- Camera Icon Overlay -->
              <button
                type="button"
                @click="triggerFileInput"
                class="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <UIcon name="i-heroicons-camera" class="w-4 h-4" />
              </button>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
            <p class="text-sm text-gray-500 mt-2">Haz clic en el ícono para cambiar la foto</p>
          </div>

          <!-- Form Fields -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input
                v-model="editForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <!-- Job Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título de Trabajo</label>
              <input
                v-model="editForm.jobTitle"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="Ej: Software Engineer"
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                v-model="editForm.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="editForm.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <textarea
                v-model="editForm.address"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="Tu dirección completa"
              ></textarea>
            </div>

            <!-- Department -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <input
                v-model="editForm.department"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
                placeholder="Tu departamento"
              />
            </div>
          </div>

          <!-- Interests Section -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-3">Intereses</label>

            <!-- Current Interests List -->
            <div class="space-y-2 mb-4">
              <div v-for="(interest, index) in editForm.interests" :key="interest.id" class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div class="flex items-center space-x-2">
                  <UIcon :name="interest.icon" class="w-4 h-4 text-gray-600" />
                  <span class="text-sm text-gray-700">{{ interest.name }}</span>
                </div>
                <button
                  type="button"
                  @click="removeInterest(index)"
                  class="text-red-500 hover:text-red-700 p-1 rounded"
                  title="Eliminar interés"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                </button>
              </div>
              <div v-if="editForm.interests.length === 0" class="text-sm text-gray-500 italic text-center py-4">
                No hay intereses agregados. Agrega algunos usando el formulario de abajo.
              </div>
            </div>

            <!-- Add New Interest Form -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h5 class="text-sm font-medium text-gray-700 mb-3">Agregar Nuevo Interés</h5>
              <div class="flex space-x-2">
                <div class="flex-1">
                  <input
                    v-model="newInterest.name"
                    type="text"
                    placeholder="Nombre del interés (ej: Fotografía)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700 text-sm"
                  />
                </div>
                <div class="w-40">
                  <select
                    v-model="newInterest.icon"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700 text-sm"
                  >
                    <option value="">Seleccionar ícono</option>
                    <option v-for="iconOption in availableIcons" :key="iconOption.value" :value="iconOption.value">
                      {{ iconOption.label }}
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  @click="addInterest"
                  :disabled="!newInterest.name.trim() || !newInterest.icon"
                  class="px-3 py-2 text-white rounded-md transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style="background-color: #7db88a;"
                  :style="!newInterest.name.trim() || !newInterest.icon ? 'background-color: #9ca3af !important' : ''"
                  onmouseover="if (!this.disabled) this.style.backgroundColor='#6ba378'"
                  onmouseout="if (!this.disabled) this.style.backgroundColor='#7db88a'"
                >
                  <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white rounded-md transition-colors"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user, logout, updateUser } = useAuth()

// Sidebar visibility
const sidebarVisible = ref(false)

// Modal and form state
const showEditModal = ref(false)
const fileInput = ref(null)

// Edit form data
const editForm = ref({
  name: '',
  jobTitle: '',
  phone: '',
  email: '',
  address: '',
  department: '',
  profilePhoto: null,
  interests: []
})

// New interest form
const newInterest = ref({
  name: '',
  icon: ''
})

// Default interests
const defaultInterests = [
  { id: 1, name: 'Coding', icon: 'i-heroicons-computer-desktop' },
  { id: 2, name: 'Reading', icon: 'i-heroicons-book-open' },
  { id: 3, name: 'Hiking', icon: 'i-heroicons-mountain' }
]

// Available icons for interests
const availableIcons = [
  { value: 'i-heroicons-computer-desktop', label: '💻 Tecnología' },
  { value: 'i-heroicons-book-open', label: '📚 Lectura' },
  { value: 'i-heroicons-mountain', label: '🏔️ Montañismo' },
  { value: 'i-heroicons-camera', label: '📷 Fotografía' },
  { value: 'i-heroicons-musical-note', label: '🎵 Música' },
  { value: 'i-heroicons-paint-brush', label: '🎨 Arte' },
  { value: 'i-heroicons-trophy', label: '🏆 Deportes' },
  { value: 'i-heroicons-beaker', label: '🧪 Ciencia' },
  { value: 'i-heroicons-heart', label: '❤️ Salud' },
  { value: 'i-heroicons-globe-alt', label: '🌍 Viajes' },
  { value: 'i-heroicons-wrench-screwdriver', label: '🔧 Bricolaje' },
  { value: 'i-heroicons-puzzle-piece', label: '🧩 Juegos' },
  { value: 'i-heroicons-academic-cap', label: '🎓 Educación' },
  { value: 'i-heroicons-fire', label: '🔥 Cocina' },
  { value: 'i-heroicons-star', label: '⭐ Entretenimiento' }
]

// Computed property for user interests
const userInterests = computed(() => {
  return user.value?.interests || defaultInterests
})

// Initialize form with current user data
const initializeForm = () => {
  editForm.value = {
    name: user.value?.name || '',
    jobTitle: user.value?.jobTitle || 'Software Engineer',
    phone: user.value?.phone || '+1 (555) 123-4567',
    email: user.value?.email || '',
    address: user.value?.address || '123 Main Street, Anytown, USA',
    department: user.value?.department || '',
    profilePhoto: user.value?.profilePhoto || null,
    interests: user.value?.interests ? [...user.value.interests] : [...defaultInterests]
  }
}

// Watch for user changes to update form
watch(user, () => {
  if (user.value) {
    initializeForm()
  }
}, { immediate: true })

const handleLogout = () => {
  logout()
  navigateTo('/login')
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.profilePhoto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Functions for managing interests
const addInterest = () => {
  if (!newInterest.value.name.trim() || !newInterest.value.icon) return

  const newId = Date.now() // Simple ID generation
  const interest = {
    id: newId,
    name: newInterest.value.name.trim(),
    icon: newInterest.value.icon
  }

  editForm.value.interests.push(interest)

  // Reset form
  newInterest.value = {
    name: '',
    icon: ''
  }
}

const removeInterest = (index) => {
  editForm.value.interests.splice(index, 1)
}

const toast = useToast()

const saveProfile = async () => {
  try {
    const updatedUserData = {
      name: editForm.value.name,
      jobTitle: editForm.value.jobTitle,
      phone: editForm.value.phone,
      email: editForm.value.email,
      address: editForm.value.address,
      department: editForm.value.department,
      profilePhoto: editForm.value.profilePhoto,
      interests: editForm.value.interests
    }

    // Llamar al API para actualizar el perfil
    const result = await updateUser(updatedUserData)

    if (result.success) {
      showEditModal.value = false
      toast.add({
        title: 'Perfil actualizado',
        description: 'Los cambios se han guardado exitosamente',
        icon: 'i-heroicons-check-circle',
        timeout: 3000,
        ui: {
          background: 'bg-[#3a5a47]',
          border: 'border-2 border-[#7db88a]',
          ring: 'ring-0',
          rounded: 'rounded-lg',
          shadow: 'shadow-xl',
          icon: {
            base: 'flex-shrink-0',
            color: 'text-[#7db88a]'
          },
          title: 'text-base font-semibold text-white',
          description: 'mt-1 text-sm leading-4 text-gray-200'
        }
      })
    } else {
      toast.add({
        title: 'Error',
        description: result.error || 'Error al guardar los cambios. Por favor intenta de nuevo.',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      })
    }

  } catch (error) {
    console.error('Error al actualizar el perfil:', error)
    toast.add({
      title: 'Error',
      description: 'Error al guardar los cambios. Por favor intenta de nuevo.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red'
    })
  }
}

const cancelEdit = () => {
  showEditModal.value = false
  initializeForm() // Reset form to original values

  // Reset new interest form
  newInterest.value = {
    name: '',
    icon: ''
  }

  // Clear file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Initialize form when component mounts
onMounted(() => {
  initializeForm()
})
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
</style>