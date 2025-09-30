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

  // Función para login con Google
  const loginWithGoogle = async (credential) => {
    try {
      const data = await $fetch('/api/auth/google', {
        method: 'POST',
        body: { credential }
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
      console.error('Error de login con Google:', error)
      return {
        success: false,
        error: error.data?.message || error.message || 'Error de conexión'
      }
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
  const updateUser = async (updatedData) => {
    if (!user.value) return { success: false, error: 'Usuario no autenticado' }

    try {
      const data = await $fetch('/api/users/profile', {
        method: 'PATCH',
        body: {
          userId: user.value._id,
          ...updatedData
        }
      })

      if (data.success) {
        // Actualizar estado local
        user.value = data.user

        // Actualizar localStorage
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }

        return { success: true, user: data.user }
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      return {
        success: false,
        error: error.data?.message || error.message || 'Error al actualizar el perfil'
      }
    }
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    login,
    loginSimple,
    loginWithGoogle,
    logout,
    checkAuth,
    isAdmin,
    isUser,
    hasRole,
    updateUser
  }
}