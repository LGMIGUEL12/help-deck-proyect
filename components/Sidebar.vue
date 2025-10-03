<template>
  <div class="flex flex-col fixed h-full z-10 transition-all duration-300" :class="sidebarVisible ? 'w-64' : 'w-16'" style="background-color: #284734;">
    <!-- Header -->
    <div class="p-2 border-b" style="border-color: #5a7a67;">
      <div class="flex items-center justify-between">
        <div v-if="sidebarVisible" class="flex items-center">
          <img src="/img/logo.png" alt="Logo" class="h-12 w-auto" />
        </div>
        <!-- Botón hamburguesa -->
        <button
          @click="toggleSidebar"
          class="text-gray-300 hover:text-white transition-colors p-1"
          :class="sidebarVisible ? '' : 'mx-auto'"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-2 overflow-y-auto">
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/home"
            class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
            :class="[sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center', { 'text-white': currentPage === 'home', 'bg-[#7db88a]': currentPage === 'home' }]"
            :title="!sidebarVisible ? 'Volver al Home' : ''">
            <UIcon name="i-heroicons-home" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
            <span v-if="sidebarVisible">Volver al Home</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/tickets"
            class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
            :class="[sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center', { 'text-white': currentPage === 'tickets', 'bg-[#7db88a]': currentPage === 'tickets' }]"
            :title="!sidebarVisible ? 'Mis Tickets' : ''">
            <UIcon name="i-heroicons-ticket" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
            <span v-if="sidebarVisible">Mis Tickets</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/historia"
            class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
            :class="[sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center', { 'text-white': currentPage === 'historia', 'bg-[#7db88a]': currentPage === 'historia' }]"
            :title="!sidebarVisible ? 'Historia' : ''">
            <UIcon name="i-heroicons-archive-box" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
            <span v-if="sidebarVisible">Historia</span>
          </NuxtLink>
        </li>
        <li v-if="user?.role === 'admin'">
          <NuxtLink to="/admin"
            class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
            :class="[sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center', { 'text-white': currentPage === 'admin', 'bg-[#7db88a]': currentPage === 'admin' }]"
            :title="!sidebarVisible ? 'Panel de Control' : ''">
            <UIcon name="i-heroicons-squares-plus" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
            <span v-if="sidebarVisible">Panel de Control</span>
          </NuxtLink>
        </li>
        <li v-if="user?.role === 'admin'">
          <NuxtLink to="/users"
            class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
            :class="[sidebarVisible ? 'px-3 py-2' : 'px-2 py-2 justify-center', { 'text-white': currentPage === 'users', 'bg-[#7db88a]': currentPage === 'users' }]"
            :title="!sidebarVisible ? 'Usuarios' : ''">
            <UIcon name="i-heroicons-users" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
            <span v-if="sidebarVisible">Usuarios</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- User info and logout -->
    <div class="p-2 border-t" style="border-color: #5a7a67;">
      <div v-if="sidebarVisible" class="flex items-center space-x-3 mb-3 px-2">
        <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            v-if="user?.profilePhoto"
            :src="user.profilePhoto"
            :alt="user?.name"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-sm font-medium text-gray-700 uppercase">
            {{ user?.name?.charAt(0) }}
          </span>
        </div>
        <div>
          <div class="text-sm font-medium text-white">{{ user?.name }}</div>
          <div class="text-xs text-gray-300">{{ user?.department }}</div>
        </div>
      </div>
      <div v-else class="flex justify-center mb-3">
        <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            v-if="user?.profilePhoto"
            :src="user.profilePhoto"
            :alt="user?.name"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-xs font-medium text-gray-700 uppercase">
            {{ user?.name?.charAt(0) }}
          </span>
        </div>
      </div>
      <button
        @click="handleLogout"
        class="flex items-center rounded-lg hover:text-white transition-colors hover:bg-[#5a7a67] text-gray-300"
        :class="sidebarVisible ? 'w-full px-3 py-2' : 'px-2 py-2 justify-center w-full'"
        :title="!sidebarVisible ? 'Cerrar Sesión' : ''"
      >
        <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" :class="sidebarVisible ? 'mr-3' : ''" />
        <span v-if="sidebarVisible">Cerrar Sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: String,
    required: true
  }
})

const { user, logout } = useAuth()
const { sidebarVisible, toggleSidebar } = useSidebar()

const handleLogout = () => {
  logout()
  navigateTo('/login')
}
</script>
