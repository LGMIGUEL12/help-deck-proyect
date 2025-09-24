<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 text-white flex flex-col" style="background-color: #3a4b40">
      <div class="px-8 py-6 border-b" style="border-color: #9db0a3">
        <h1 class="text-2xl font-semibold">Help Desk</h1>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a href="#" class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors" @mouseenter="$event.target.style.backgroundColor='#9db0a3'" @mouseleave="$event.target.style.backgroundColor='transparent'">
          <UIcon name="i-heroicons-home" class="w-5 h-5 mr-3" />
          Home
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-white rounded-md" style="background-color: #9db0a3">
          <UIcon name="i-heroicons-ticket" class="w-5 h-5 mr-3" />
          Console
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors" @mouseenter="$event.target.style.backgroundColor='#9db0a3'" @mouseleave="$event.target.style.backgroundColor='transparent'">
          <UIcon name="i-heroicons-cog" class="w-5 h-5 mr-3" />
          Setting
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors" @mouseenter="$event.target.style.backgroundColor='#9db0a3'" @mouseleave="$event.target.style.backgroundColor='transparent'">
          <UIcon name="i-heroicons-user" class="w-5 h-5 mr-3" />
          Ustar
        </a>
        <a href="#" class="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md transition-colors" @mouseenter="$event.target.style.backgroundColor='#9db0a3'" @mouseleave="$event.target.style.backgroundColor='transparent'">
          <UIcon name="i-heroicons-user-group" class="w-5 h-5 mr-3" />
          Uove
        </a>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <NuxtPage />
    </div>
  </div>
</template>
