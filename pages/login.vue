<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <!-- Background Image - Fixed position, no repeat -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
      style="background-image: url('/img/Backgrounds.png');"
    ></div>

    <!-- Back to Home Link -->
    <div class="absolute top-6 left-6 z-20">
      <NuxtLink to="/home" class="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-medium">Volver a Home</span>
      </NuxtLink>
    </div>

    <!-- Login Form Container -->
    <div class="relative z-10 w-full max-w-md mx-4">
      <!-- Main Login Card -->
      <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <!-- Logo/Icon -->
        <div class="flex justify-center mb-6">
          <img
            src="/img/Avatar.png"
            alt="Peeplo Logo"
            class="w-24 h-24 rounded-2xl shadow-lg"
          />
        </div>

        <!-- Header -->
        <h1 class="text-3xl font-bold text-center mb-2">
          <span class="text-purple-800">Welcome to </span>
          <span class="text-teal-600">PEEPLO</span>
        </h1>
        <h2 class="text-2xl font-bold text-center text-teal-600 mb-8">Community</h2>

        <!-- Error Message -->
        <div v-if="loginError" class="text-red-500 text-sm text-center mb-4 bg-red-100 p-3 rounded-lg">
          {{ loginError }}
        </div>

        <!-- Google Login Button -->
        <div class="space-y-4">
          <div id="googleButtonContainer"></div>
        </div>

        <!-- Footer Text -->
        <p class="text-center text-purple-400 text-sm mt-6">
          Only authorized Sommardahl Ventures domains
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://accounts.google.com/gsi/client',
      async: true,
      defer: true
    }
  ]
})

const { loginWithGoogle } = useAuth()
const loginError = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()

// Inicializar Google Sign-In
onMounted(() => {
  const initGoogle = () => {
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.initialize({
          client_id: config.public.googleClientId,
          callback: handleGoogleCallback,
          auto_select: false
        })

        const container = document.getElementById('googleButtonContainer')
        if (container) {
          window.google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular'
          })
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error)
      }
    } else {
      // Si el script aún no está cargado, esperar un poco y reintentar
      setTimeout(initGoogle, 100)
    }
  }

  initGoogle()
})

// Callback para manejar la respuesta de Google
const handleGoogleCallback = async (response) => {
  isLoading.value = true
  loginError.value = ''

  try {
    const result = await loginWithGoogle(response.credential)

    if (result.success) {
      // Redirect based on user role
      if (result.user.role === 'admin') {
        await navigateTo('/admin')
      } else {
        await navigateTo('/tickets')
      }
    } else {
      loginError.value = result.error
    }
  } catch (error) {
    loginError.value = 'Error de conexión con Google. Intenta nuevamente.'
  } finally {
    isLoading.value = false
  }
}
</script>