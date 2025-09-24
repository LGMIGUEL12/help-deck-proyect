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
        <UButton style="background-color: #a8d5ba; color: #3d5a52;" class="font-semibold">
          Login/Sign Up
        </UButton>
      </nav>
    </header>

    <main class="flex-1 flex items-center justify-center px-8">
      <div class="max-w-4xl w-full">
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">
            How can we help you today?
          </h1>

          <div class="flex gap-2 mb-8">
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="w-full px-12 py-4 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <UButton style="background-color: #2563eb;" class="px-8 py-4">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </UButton>
          </div>

          <div class="flex justify-center gap-4 flex-wrap">
            <NuxtLink to="/tickets">
              <UButton style="background-color: white; color: #3d5a52;" class="px-6 py-3 font-medium">
                Submit a Ticket
              </UButton>
            </NuxtLink>
            <UButton style="background-color: #4CAF50; color: white;" class="px-6 py-3 font-medium">
              Browse Knowledge Base
            </UButton>
            <UButton style="background-color: #2196F3; color: white;" class="px-6 py-3 font-medium">
              Contact Support
            </UButton>
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
  </div>
</template>

<script setup>
const searchQuery = ref('')
</script>