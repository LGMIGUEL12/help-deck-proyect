export const useAuth = () => {
  // Estado global de autenticación
  const isLoggedIn = useState('auth.isLoggedIn', () => false)
  const user = useState('auth.user', () => null)

  // Función para iniciar sesión
  const login = (userData) => {
    isLoggedIn.value = true
    user.value = userData

    // Aquí podrías guardar en localStorage si necesitas persistencia
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

  return {
    isLoggedIn: readonly(isLoggedIn),
    user: readonly(user),
    login,
    logout,
    checkAuth
  }
}