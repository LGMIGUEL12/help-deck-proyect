export const useAuth = () => {
  // Estado global de autenticación
  const isLoggedIn = useState('auth.isLoggedIn', () => false)
  const user = useState('auth.user', () => null)

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (data.success) {
        isLoggedIn.value = true
        user.value = data.user

        // Guardar en localStorage para persistencia
        if (process.client) {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('user', JSON.stringify(data.user))
        }

        return { success: true, user: data.user }
      }
    } catch (error) {
      console.error('Error de login:', error)
      return {
        success: false,
        error: error.data?.message || error.message || 'Error de conexión'
      }
    }
  }

  // Función para login simple (mantenida para compatibilidad)
  const loginSimple = (userData) => {
    isLoggedIn.value = true
    user.value = userData

    if (process.client) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    isLoggedIn.value = false
    user.value = null

    if (process.client) {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
    }
  }

  // Función para verificar el estado de autenticación al iniciar la app
  const checkAuth = () => {
    if (process.client) {
      const storedAuth = localStorage.getItem('isLoggedIn')
      const storedUser = localStorage.getItem('user')

      if (storedAuth === 'true' && storedUser) {
        isLoggedIn.value = true
        user.value = JSON.parse(storedUser)
      }
    }
  }

  // Funciones de verificación de roles
  const isAdmin = () => {
    return user.value?.role === 'admin'
  }

  const isUser = () => {
    return user.value?.role === 'user'
  }

  const hasRole = (role) => {
    return user.value?.role === role
  }

  // Función para actualizar el usuario
  const updateUser = (updatedData) => {
    if (user.value) {
      user.value = { ...user.value, ...updatedData }

      // Actualizar localStorage también
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    }
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    login,
    loginSimple,
    logout,
    checkAuth,
    isAdmin,
    isUser,
    hasRole,
    updateUser
  }
}