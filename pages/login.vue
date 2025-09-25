<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <!-- Background with gradient overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');"
    ></div>
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 opacity-80"></div>

    <!-- Back to Home Link -->
    <div class="absolute top-6 left-6 z-20">
      <NuxtLink to="/home" class="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
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
        <!-- Header -->
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Login</h1>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Field -->
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
              :class="{
                'border-gray-200 focus:ring-teal-500': !emailError,
                'border-red-500 focus:ring-red-500': emailError
              }"
              required
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
              :class="{
                'border-gray-200 focus:ring-teal-500': !passwordError,
                'border-red-500 focus:ring-red-500': passwordError
              }"
              required
            />
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
          </div>

          <!-- Remember me and Forgot password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="mr-2 w-4 h-4 rounded border-2 border-gray-400 text-teal-600 focus:ring-teal-500 focus:ring-2 bg-white checked:bg-teal-600 checked:border-teal-600"
              />
              <span class="text-gray-800">Remember me</span>
            </label>
            <a href="#" class="text-teal-600 hover:text-teal-700">Forgot password?</a>
          </div>

          <!-- Sign In Button -->
          <button
            type="submit"
            class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
          >
            Sign In
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-gray-500 text-sm">OR</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Social Login Buttons -->
        <div class="space-y-3">
          <!-- Google Login -->
          <button
            type="button"
            class="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <!-- Apple Login -->
          <button
            type="button"
            class="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center mt-6">
        <p class="text-white text-sm">
          Don't have an account?
          <NuxtLink to="/signup" class="font-medium underline hover:no-underline">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Joi from 'joi'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const emailError = ref('')
const passwordError = ref('')

// Email validation schema
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()

// Password validation schema
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[A-Z])(?=.*\d)/)
  .required()
  .messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.pattern.base': 'La contraseña debe tener al menos 1 letra mayúscula y 1 número',
    'string.empty': 'La contraseña es requerida'
  })

// Watch email input for validation
watch(email, (newEmail) => {
  if (newEmail) {
    const { error } = emailSchema.validate(newEmail)
    emailError.value = error ? 'Por favor ingresa un correo electrónico válido' : ''
  } else {
    emailError.value = ''
  }
})

// Watch password input for validation
watch(password, (newPassword) => {
  if (newPassword) {
    const { error } = passwordSchema.validate(newPassword)
    passwordError.value = error ? error.message : ''
  } else {
    passwordError.value = ''
  }
})

const handleLogin = () => {
  // Validate email before submission
  const emailValidation = emailSchema.validate(email.value)
  if (emailValidation.error) {
    emailError.value = 'Por favor ingresa un correo electrónico válido'
    return
  }

  // Validate password before submission
  const passwordValidation = passwordSchema.validate(password.value)
  if (passwordValidation.error) {
    passwordError.value = passwordValidation.error.message
    return
  }

  // Handle login logic here
  console.log('Login attempt:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
}
</script>