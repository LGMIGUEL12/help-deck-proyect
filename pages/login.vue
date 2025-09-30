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
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
                :class="{
                  'border-gray-200 focus:ring-teal-500': !passwordError,
                  'border-red-500 focus:ring-red-500': passwordError
                }"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <!-- Eye icon (show password) -->
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Eye slash icon (hide password) -->
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
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

          <!-- Error Message -->
          <div v-if="loginError" class="text-red-500 text-sm text-center">
            {{ loginError }}
          </div>

          <!-- Sign In Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
          >
            {{ isLoading ? 'Iniciando sesión...' : 'Sign In' }}
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
          <div id="googleButtonContainer"></div>
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

useHead({
  script: [
    {
      src: 'https://accounts.google.com/gsi/client',
      async: true,
      defer: true
    }
  ]
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const emailError = ref('')
const passwordError = ref('')
const showPassword = ref(false)

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

const { login, loginWithGoogle } = useAuth()
const loginError = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()

// Inicializar Google Sign-In
onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: config.public.googleClientId,
      callback: handleGoogleCallback,
      auto_select: false
    })

    window.google.accounts.id.renderButton(
      document.getElementById('googleButtonContainer'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'continue_with',
        shape: 'rectangular'
      }
    )
  }
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

const handleLogin = async () => {
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

  isLoading.value = true
  loginError.value = ''

  try {
    const result = await login(email.value, password.value)

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
    loginError.value = 'Error de conexión. Intenta nuevamente.'
  } finally {
    isLoading.value = false
  }
}
</script>