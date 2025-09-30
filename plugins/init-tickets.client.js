export default defineNuxtPlugin(async () => {
  const { isLoggedIn } = useAuth()
  const { fetchTickets } = useTickets()

  // Si el usuario está logueado, cargar los tickets
  if (isLoggedIn.value) {
    try {
      await fetchTickets()
    } catch (error) {
      console.error('Error initializing tickets:', error)
    }
  }
})