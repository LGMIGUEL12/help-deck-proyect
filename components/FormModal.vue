<template>
  <UModal :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)" :ui="{ width: 'sm:max-w-lg', padding: 'p-0' }">
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-2xl font-bold text-black mb-6">{{ title }}</h2>

      <div class="space-y-5">
        <div v-for="field in fields" :key="field.key">
          <label class="block text-sm font-semibold text-black mb-2">{{ field.label }}</label>

          <input
            v-if="field.type === 'input' || field.type === 'email' || !field.type"
            :type="field.type === 'email' ? 'email' : 'text'"
            :value="modelValue[field.key]"
            @input="$emit('update:modelValue', { ...modelValue, [field.key]: $event.target.value })"
            :placeholder="field.placeholder"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
          />

          <div v-else-if="field.type === 'select'" class="relative">
            <USelectMenu
              :model-value="modelValue[field.key]"
              @update:model-value="$emit('update:modelValue', { ...modelValue, [field.key]: typeof $event === 'object' ? $event.value : $event })"
              :options="field.options"
              :placeholder="field.placeholder"
              value-attribute="value"
              option-attribute="label"
              :ui-menu="{
                base: '!bg-[#E3F3EA] !border-0',
                background: '!bg-[#E3F3EA]',
                ring: '',
                shadow: 'shadow-lg',
                option: {
                  base: 'cursor-pointer select-none relative py-2 px-3',
                  color: '!text-[#010102]',
                  active: '!bg-[#2E7E57] !text-white',
                  selected: '!bg-[#2E7E57] !text-white',
                  inactive: '!bg-[#E3F3EA] !text-[#010102]'
                }
              }"
            >
              <template #default="{ open }">
                <button
                  type="button"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 flex items-center justify-between text-left"
                >
                  <span>{{ modelValue[field.key] || field.placeholder }}</span>
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </template>
            </USelectMenu>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <UButton style="background-color: #e0e0e0; color: black" size="lg" @click="$emit('cancel')">Cancel</UButton>
        <UButton style="background-color: #4CAF50; color: white" size="lg" @click="$emit('save')">{{ saveButtonLabel }}</UButton>
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
  fields: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  },
  saveButtonLabel: {
    type: String,
    default: 'Save'
  }
})

defineEmits(['update:isOpen', 'update:modelValue', 'cancel', 'save'])
</script>