<template>
  <div class="min-h-screen flex items-center justify-center relative py-8">
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

    <!-- Sign Up Form Container -->
    <div class="relative z-10 w-full max-w-md mx-4">
      <!-- Main Sign Up Card -->
      <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <!-- Header -->
        <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Sign Up</h1>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignUp" class="space-y-4">
          <!-- Name Fields Row -->
          <div class="grid grid-cols-2 gap-3">
            <!-- First Name -->
            <div>
              <input
                v-model="firstName"
                type="text"
                placeholder="Nombre"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
                :class="{
                  'border-gray-200 focus:ring-teal-500': !firstNameError,
                  'border-red-500 focus:ring-red-500': firstNameError
                }"
                required
              />
              <p v-if="firstNameError" class="text-red-500 text-xs mt-1">{{ firstNameError }}</p>
            </div>
            <!-- Last Name -->
            <div>
              <input
                v-model="lastName"
                type="text"
                placeholder="Apellido"
                class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
                :class="{
                  'border-gray-200 focus:ring-teal-500': !lastNameError,
                  'border-red-500 focus:ring-red-500': lastNameError
                }"
                required
              />
              <p v-if="lastNameError" class="text-red-500 text-xs mt-1">{{ lastNameError }}</p>
            </div>
          </div>

          <!-- Birth Date Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
            <input
              v-model="birthDate"
              type="date"
              max="2006-12-31"
              min="1930-01-01"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900 cursor-pointer"
              :class="{
                'border-gray-200 focus:ring-teal-500': !birthDateError,
                'border-red-500 focus:ring-red-500': birthDateError
              }"
              style="color-scheme: light;"
              required
            />
            <p v-if="birthDateError" class="text-red-500 text-xs mt-1">{{ birthDateError }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Correo electrónico"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
              :class="{
                'border-gray-200 focus:ring-teal-500': !emailError,
                'border-red-500 focus:ring-red-500': emailError
              }"
              required
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
          </div>

          <!-- Phone Number Field -->
          <div>
            <input
              v-model="phoneNumber"
              type="tel"
              placeholder="Número de teléfono"
              class="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
              :class="{
                'border-gray-200 focus:ring-teal-500': !phoneNumberError,
                'border-red-500 focus:ring-red-500': phoneNumberError
              }"
              required
            />
            <p v-if="phoneNumberError" class="text-red-500 text-xs mt-1">{{ phoneNumberError }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Contraseña"
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

          <!-- Confirm Password Field -->
          <div>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirmar contraseña"
                class="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900"
                :class="{
                  'border-gray-200 focus:ring-teal-500': !confirmPasswordError,
                  'border-red-500 focus:ring-red-500': confirmPasswordError
                }"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <!-- Eye icon (show password) -->
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Eye slash icon (hide password) -->
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="confirmPasswordError" class="text-red-500 text-xs mt-1">{{ confirmPasswordError }}</p>
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
          >
            <span v-if="isLoading">Creando cuenta...</span>
            <span v-else>Sign Up</span>
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
          <!-- Google Sign Up -->
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

          <!-- Apple Sign Up -->
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

      <!-- Login Link -->
      <div class="text-center mt-6">
        <p class="text-white text-sm">
          Already have an account?
          <NuxtLink to="/login" class="font-medium underline hover:no-underline">
            Login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Joi from 'joi'

const firstName = ref('')
const lastName = ref('')
const birthDate = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const confirmPassword = ref('')

// Estados de error
const firstNameError = ref('')
const lastNameError = ref('')
const birthDateError = ref('')
const emailError = ref('')
const phoneNumberError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation schemas
const firstNameSchema = Joi.string()
  .required()
  .min(2)
  .messages({
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres'
  })

const lastNameSchema = Joi.string()
  .required()
  .min(2)
  .messages({
    'string.empty': 'El apellido es requerido',
    'string.min': 'El apellido debe tener al menos 2 caracteres'
  })

const birthDateSchema = Joi.date()
  .required()
  .max('2006-12-31')
  .min('1930-01-01')
  .messages({
    'date.base': 'La fecha de nacimiento es requerida',
    'any.required': 'La fecha de nacimiento es requerida',
    'date.max': 'Debes tener al menos 18 años',
    'date.min': 'La fecha de nacimiento no es válida'
  })

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    'string.empty': 'El correo electrónico es requerido',
    'string.email': 'Por favor ingresa un correo electrónico válido'
  })

const phoneNumberSchema = Joi.string()
  .required()
  .min(10)
  .pattern(/^[0-9]+$/)
  .messages({
    'string.empty': 'El número de teléfono es requerido',
    'string.min': 'El número de teléfono debe tener al menos 10 dígitos',
    'string.pattern.base': 'El número de teléfono solo puede contener números'
  })

const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[A-Z])(?=.*\d)/)
  .required()
  .messages({
    'string.empty': 'La contraseña es requerida',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.pattern.base': 'La contraseña debe tener al menos 1 letra mayúscula y 1 número'
  })

// Watchers para validación en tiempo real
watch(firstName, (value) => {
  if (value) {
    const { error } = firstNameSchema.validate(value)
    firstNameError.value = error ? error.message : ''
  } else {
    firstNameError.value = ''
  }
})

watch(lastName, (value) => {
  if (value) {
    const { error } = lastNameSchema.validate(value)
    lastNameError.value = error ? error.message : ''
  } else {
    lastNameError.value = ''
  }
})

watch(birthDate, (value) => {
  if (value) {
    const { error } = birthDateSchema.validate(value)
    birthDateError.value = error ? error.message : ''
  } else {
    birthDateError.value = ''
  }
})

watch(email, (value) => {
  if (value) {
    const { error } = emailSchema.validate(value)
    emailError.value = error ? error.message : ''
  } else {
    emailError.value = ''
  }
})

watch(phoneNumber, (value) => {
  if (value) {
    const { error } = phoneNumberSchema.validate(value)
    phoneNumberError.value = error ? error.message : ''
  } else {
    phoneNumberError.value = ''
  }
})

watch(password, (value) => {
  if (value) {
    const { error } = passwordSchema.validate(value)
    passwordError.value = error ? error.message : ''
  } else {
    passwordError.value = ''
  }

  // Validar confirmación de contraseña cuando cambia la contraseña
  if (confirmPassword.value) {
    confirmPasswordError.value = value !== confirmPassword.value ? 'Las contraseñas no coinciden' : ''
  }
})

watch(confirmPassword, (value) => {
  if (value) {
    confirmPasswordError.value = password.value !== value ? 'Las contraseñas no coinciden' : ''
  } else {
    confirmPasswordError.value = ''
  }
})

const isFormValid = computed(() => {
  return firstName.value &&
         lastName.value &&
         birthDate.value &&
         email.value &&
         phoneNumber.value &&
         password.value &&
         confirmPassword.value &&
         !firstNameError.value &&
         !lastNameError.value &&
         !birthDateError.value &&
         !emailError.value &&
         !phoneNumberError.value &&
         !passwordError.value &&
         !confirmPasswordError.value
})

const { loginSimple } = useAuth()
const isLoading = ref(false)

const handleSignUp = async () => {
  // Validar todos los campos antes de enviar
  let hasErrors = false

  // Validar nombre
  const firstNameValidation = firstNameSchema.validate(firstName.value)
  if (firstNameValidation.error) {
    firstNameError.value = firstNameValidation.error.message
    hasErrors = true
  }

  // Validar apellido
  const lastNameValidation = lastNameSchema.validate(lastName.value)
  if (lastNameValidation.error) {
    lastNameError.value = lastNameValidation.error.message
    hasErrors = true
  }

  // Validar fecha de nacimiento
  const birthDateValidation = birthDateSchema.validate(birthDate.value)
  if (birthDateValidation.error) {
    birthDateError.value = birthDateValidation.error.message
    hasErrors = true
  }

  // Validar email
  const emailValidation = emailSchema.validate(email.value)
  if (emailValidation.error) {
    emailError.value = emailValidation.error.message
    hasErrors = true
  }

  // Validar teléfono
  const phoneValidation = phoneNumberSchema.validate(phoneNumber.value)
  if (phoneValidation.error) {
    phoneNumberError.value = phoneValidation.error.message
    hasErrors = true
  }

  // Validar contraseña
  const passwordValidation = passwordSchema.validate(password.value)
  if (passwordValidation.error) {
    passwordError.value = passwordValidation.error.message
    hasErrors = true
  }

  // Validar confirmación de contraseña
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden'
    hasErrors = true
  }

  // Si hay errores, no continuar
  if (hasErrors) {
    return
  }

  try {
    isLoading.value = true

    // Crear usuario en la base de datos
    const response = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        name: `${firstName.value} ${lastName.value}`,
        phone: phoneNumber.value,
        birthDate: birthDate.value
      }
    })

    if (response.success) {
      // Login automático después del registro
      loginSimple(response.user)

      // Redirigir a tickets
      navigateTo('/tickets')
    }
  } catch (error) {
    console.error('Error en signup:', error)

    // Manejar errores específicos
    if (error.statusCode === 409) {
      emailError.value = 'Este correo electrónico ya está registrado'
    } else if (error.data?.message) {
      alert(error.data.message)
    } else {
      alert('Error al crear la cuenta. Por favor intenta de nuevo.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>