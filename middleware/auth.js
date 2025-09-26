export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, checkAuth } = useAuth()

  // Verificar autenticación en el cliente
  if (process.client) {
    checkAuth()
  }

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})