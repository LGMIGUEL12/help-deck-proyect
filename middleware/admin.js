export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, user, checkAuth } = useAuth()

  // Verificar autenticación en el cliente
  if (process.client) {
    checkAuth()
  }

  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }

  if (user.value?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Acceso denegado. Solo administradores pueden acceder a esta página.'
    })
  }
})