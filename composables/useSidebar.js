export const useSidebar = () => {
  const sidebarVisible = useState('sidebarVisible', () => true)

  // Cargar el estado desde localStorage solo en el cliente
  onMounted(() => {
    const savedState = localStorage.getItem('sidebarVisible')
    if (savedState !== null) {
      sidebarVisible.value = savedState === 'true'
    }
  })

  // Guardar el estado cuando cambie
  watch(sidebarVisible, (newValue) => {
    if (process.client) {
      localStorage.setItem('sidebarVisible', newValue.toString())
    }
  })

  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value
  }

  return {
    sidebarVisible,
    toggleSidebar
  }
}
