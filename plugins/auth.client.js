export default defineNuxtPlugin(() => {
  const { checkAuth } = useAuth()

  // Verificar autenticación al cargar la aplicación
  checkAuth()
})