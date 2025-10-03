<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar currentPage="users" />

    <!-- Main Content -->
    <div :class="sidebarVisible ? 'ml-64' : 'ml-16'" class="min-h-screen flex flex-col bg-gray-50 transition-all duration-300">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h2 class="text-2xl font-semibold text-gray-900">Gestión de Usuarios</h2>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Add User Button -->
            <button
              @click="showAddModal = true"
              class="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              style="background-color: #7db88a;"
              onmouseover="this.style.backgroundColor='#6ba378'"
              onmouseout="this.style.backgroundColor='#7db88a'"
            >
              <UIcon name="i-heroicons-plus" class="w-4 h-4" />
              <span>Agregar Usuario</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 p-6 bg-gray-50">
        <!-- Users Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Table Header -->
          <div class="px-6 py-4 border-b border-gray-200">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Lista de Usuarios</h3>
              <p class="text-sm text-gray-500">
                Total: {{ usersList.length }} usuario(s) registrado(s)
              </p>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="userItem in usersList" :key="userItem._id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                          <img
                            v-if="userItem.profilePhoto"
                            :src="userItem.profilePhoto"
                            :alt="userItem.name"
                            class="w-full h-full object-cover"
                          />
                          <span v-else class="text-sm font-medium text-gray-700 uppercase">
                            {{ userItem.name.charAt(0) }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ userItem.name }}</div>
                        <div class="text-sm text-gray-500">{{ userItem.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ userItem.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        userItem.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      ]"
                    >
                      {{ userItem.role === 'admin' ? 'Administrador' : 'Usuario' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ userItem.department }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(userItem.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="editUser(userItem)"
                        class="bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition-colors"
                        title="Editar usuario"
                      >
                        <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                      </button>
                      <button
                        v-if="userItem._id !== user?._id"
                        @click="confirmDeleteUser(userItem)"
                        class="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-900 px-2 py-1 rounded transition-colors"
                        title="Eliminar usuario"
                      >
                        <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                      </button>
                      <span v-else class="text-gray-400 text-xs px-2 py-1">
                        (Tu cuenta)
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Agregar Nuevo Usuario</h3>
          <button @click="closeAddModal" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input
              v-model="newUser.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Nombre del usuario"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              v-model="newUser.role"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <input
              v-model="newUser.department"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Departamento del usuario"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeAddModal"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
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
              Agregar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Editar Usuario</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
            <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="saveUserEdit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input
              v-model="editUserData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Nombre del usuario"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="editUserData.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              v-model="editUserData.role"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <input
              v-model="editUserData.department"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 green-focus bg-white text-gray-700"
              placeholder="Departamento del usuario"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
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

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <!-- Modal Header -->
        <div class="flex items-center p-6 pb-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Usuario Creado Exitosamente</h3>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="px-6 pb-6">
          <p class="text-sm text-gray-600 mb-4">
            El usuario <span class="font-semibold text-gray-900">{{ successMessage.name }}</span> ha sido creado correctamente.
          </p>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div class="flex">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div class="ml-3 flex-1">
                <h4 class="text-sm font-medium text-blue-900 mb-1">Contraseña por defecto</h4>
                <div class="flex items-center gap-2">
                  <code class="bg-blue-100 px-2 py-1 rounded font-mono text-sm text-blue-800">Password123!</code>
                  <button
                    @click="copyPassword"
                    class="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                    :title="passwordCopied ? 'Copiado!' : 'Copiar contraseña'"
                  >
                    <UIcon v-if="!passwordCopied" name="i-heroicons-clipboard" class="w-4 h-4" />
                    <UIcon v-else name="i-heroicons-check" class="w-4 h-4" />
                    <span>{{ passwordCopied ? 'Copiado' : 'Copiar' }}</span>
                  </button>
                </div>
                <p class="text-xs text-blue-700 mt-2">
                  El usuario puede cambiar su contraseña después de iniciar sesión por primera vez.
                </p>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex justify-end">
            <button
              type="button"
              @click="showSuccessModal = false"
              class="px-6 py-2 text-white rounded-md transition-colors font-medium"
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <!-- Modal Header -->
        <div class="flex items-center p-6 pb-4">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-red-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Confirmar Eliminación</h3>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="px-6 pb-6">
          <p class="text-sm text-gray-500 mb-6">
            ¿Estás seguro de que quieres eliminar a <span class="font-semibold text-gray-700">{{ userToDelete?.name }}</span>? Esta acción no se puede deshacer.
          </p>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showDeleteModal = false"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="deleteUser"
              class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-semibold shadow-md"
              style="background-color: #dc2626; color: white;"
              onmouseover="this.style.backgroundColor='#b91c1c'"
              onmouseout="this.style.backgroundColor='#dc2626'"
            >
              Eliminar Usuario
            </button>
          </div>
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
const { sidebarVisible } = useSidebar()

// Sidebar visibility

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)

// Form data
const newUser = ref({
  name: '',
  email: '',
  role: 'user',
  department: ''
})

const editUserData = ref({
  _id: null,
  name: '',
  email: '',
  role: 'user',
  department: ''
})

const userToDelete = ref(null)
const successMessage = ref({ name: '' })
const passwordCopied = ref(false)

// Users list from MongoDB
const usersList = ref([])

// Cargar usuarios desde la API
const loadUsers = async () => {
  try {
    const data = await $fetch('/api/users')
    if (data.success) {
      usersList.value = data.users
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Cargar usuarios al montar el componente
onMounted(() => {
  loadUsers()
})


const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

// Add user functions
const closeAddModal = () => {
  showAddModal.value = false
  newUser.value = {
    name: '',
    email: '',
    role: 'user',
    department: ''
  }
}

const addUser = async () => {
  try {
    const data = await $fetch('/api/users/create', {
      method: 'POST',
      body: {
        name: newUser.value.name,
        email: newUser.value.email,
        role: newUser.value.role,
        department: newUser.value.department,
        password: 'Password123!' // Password por defecto
      }
    })

    if (data.success) {
      // Agregar el nuevo usuario a la lista
      usersList.value.unshift(data.user)
      closeAddModal()

      // Mostrar modal de éxito
      successMessage.value = { name: data.user.name }
      showSuccessModal.value = true
    }
  } catch (error) {
    console.error('Error al crear usuario:', error)

    // Mostrar mensaje de error específico
    if (error.statusCode === 409) {
      alert('Ya existe un usuario con este correo electrónico')
    } else if (error.data?.message) {
      alert(error.data.message)
    } else {
      alert('Error al crear el usuario. Por favor intenta de nuevo.')
    }
  }
}

// Edit user functions
const editUser = (userItem) => {
  editUserData.value = {
    _id: userItem._id,
    name: userItem.name,
    email: userItem.email,
    role: userItem.role,
    department: userItem.department
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editUserData.value = {
    _id: null,
    name: '',
    email: '',
    role: 'user',
    department: ''
  }
}

const saveUserEdit = () => {
  const index = usersList.value.findIndex(u => u._id === editUserData.value._id)
  if (index !== -1) {
    usersList.value[index] = {
      ...usersList.value[index],
      name: editUserData.value.name,
      email: editUserData.value.email,
      role: editUserData.value.role,
      department: editUserData.value.department
    }
  }
  closeEditModal()

  console.log('Usuario actualizado')
}

// Delete user functions
const confirmDeleteUser = (userItem) => {
  userToDelete.value = userItem
  showDeleteModal.value = true
}

const deleteUser = () => {
  const index = usersList.value.findIndex(u => u._id === userToDelete.value._id)
  if (index !== -1) {
    usersList.value.splice(index, 1)
  }

  showDeleteModal.value = false
  userToDelete.value = null

  console.log('Usuario eliminado')
}

// Copiar contraseña al portapapeles
const copyPassword = async () => {
  try {
    await navigator.clipboard.writeText('Password123!')
    passwordCopied.value = true

    // Resetear el estado después de 2 segundos
    setTimeout(() => {
      passwordCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Error al copiar contraseña:', error)
  }
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
</style>