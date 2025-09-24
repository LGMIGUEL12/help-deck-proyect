<template>
  <UModal :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)" :ui="{ width: 'sm:max-w-lg', padding: 'p-0' }">
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-2xl font-bold text-black mb-4">{{ title }}</h2>
      <p class="text-black mb-6">{{ message }}</p>

      <div class="flex justify-end gap-3">
        <UButton style="background-color: #e0e0e0; color: black" size="lg" @click="$emit('cancel')">Cancel</UButton>
        <UButton :style="`background-color: ${confirmColor}; color: white`" size="lg" @click="$emit('confirm')">{{ confirmLabel }}</UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmLabel: {
    type: String,
    default: 'Confirm'
  },
  confirmColor: {
    type: String,
    default: '#EF5350'
  }
})

defineEmits(['update:isOpen', 'cancel', 'confirm'])
</script>