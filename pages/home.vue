<template>
  <div class="min-h-screen flex flex-col" style="background-color: #3d5a52;">
    <header class="px-8 py-4">
      <nav class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: #a8d5ba;">
              <span class="text-2xl font-bold" style="color: #3d5a52;">S</span>
            </div>
            <span class="text-white font-semibold">Help Desk</span>
          </div>
          <div class="flex items-center space-x-6">
            <a href="/" class="text-white hover:text-gray-200 transition-colors">Home</a>
            <a href="#" class="text-white hover:text-gray-200 transition-colors">Support</a>
            <a href="#" class="text-white hover:text-gray-200 transition-colors">Knowledge Base</a>
            <a href="#" class="text-white hover:text-gray-200 transition-colors">Community Forums</a>
          </div>
        </div>
        <div v-if="!isLoggedIn">
          <NuxtLink to="/login">
            <UButton style="background-color: #a8d5ba; color: #3d5a52;" class="font-semibold">
              Login
            </UButton>
          </NuxtLink>
        </div>
        <div v-else class="flex items-center space-x-4">
          <span class="text-white">Hola, {{ user?.name }}</span>
          <div class="flex space-x-2">
            <NuxtLink v-if="isAdmin()" to="/admin">
              <UButton style="background-color: #a8d5ba; color: #3d5a52;" class="font-semibold text-sm">
                Admin Panel
              </UButton>
            </NuxtLink>
            <NuxtLink to="/tickets">
              <UButton style="background-color: #a8d5ba; color: #3d5a52;" class="font-semibold text-sm">
                Tickets
              </UButton>
            </NuxtLink>
            <UButton @click="handleLogout" style="background-color: #dc2626; color: white;" class="font-semibold text-sm">
              Logout
            </UButton>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <!-- Support Center Card -->
      <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden">
        <!-- Header Section -->
        <div class="flex items-start justify-between p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <!-- Left Side: Welcome Text and Image -->
          <div class="flex items-center">
            <div class="w-40 h-28 rounded-2xl overflow-hidden mr-8 flex-shrink-0 bg-blue-100">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Support Team"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 class="text-4xl font-bold text-gray-800 leading-tight">
                Welcome to Our<br>Support Center
              </h1>
            </div>
          </div>

          <!-- Right Side: Quick Access Icons -->
          <div class="grid grid-cols-2 gap-4 min-w-[280px]">
            <div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer">
              <svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 text-center">Troubleshooting</span>
            </div>

            <div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer">
              <svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 text-center">FAQs</span>
            </div>

            <div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer">
              <svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 text-center">My Account</span>
            </div>

            <div class="flex flex-col items-center p-3 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer">
              <svg class="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 text-center">Book a Call</span>
            </div>
          </div>
        </div>

        <!-- Main Options Section -->
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Browse Knowledge Base -->
            <div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Browse<br>Knowledge Base</h3>
              <button class="text-teal-600 hover:text-teal-700 font-medium">Sap action</button>
            </div>

            <!-- Submit a Ticket -->
            <div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Submit a Ticket</h3>
              <p class="text-sm text-gray-600 mb-4">Pase Suprsong schen</p>
              <button
                @click="handleSubmitTicket"
                class="text-teal-600 hover:text-teal-700 font-medium"
              >
                Sap action
              </button>
            </div>

            <!-- Live Chat -->
            <div class="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
              <p class="text-sm text-gray-600 mb-4">Tieser Ho Pes Soming<br>Suppoe</p>
              <button class="text-orange-500 hover:text-orange-600 font-medium">Sap action</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="px-8 py-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <a href="#" class="text-white hover:text-gray-200 transition-colors text-sm">About Us</a>
          <a href="#" class="text-white hover:text-gray-200 transition-colors text-sm">Privacy Policy</a>
          <a href="#" class="text-white hover:text-gray-200 transition-colors text-sm">Terms of Service</a>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-white hover:text-gray-200 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-gray-200 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-gray-200 transition-colors">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
        <div class="fixed bottom-6 right-6">
          <button class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #4CAF50;">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>

    <!-- Login Required Modal -->
    <LoginRequiredModal :isOpen="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script setup>
const searchQuery = ref('')
const showLoginModal = ref(false)

const { isLoggedIn, user, checkAuth, logout, isAdmin } = useAuth()

// Check authentication status on page load
onMounted(() => {
  checkAuth()
})

const handleLogout = () => {
  logout()
}

const handleSubmitTicket = () => {
  if (isLoggedIn.value) {
    // Usuario está logueado, navegar a tickets
    navigateTo('/tickets')
  } else {
    // Usuario no está logueado, mostrar modal
    showLoginModal.value = true
  }
}
</script>