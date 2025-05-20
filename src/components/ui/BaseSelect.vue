<template>
  <div class="w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="computedId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <!-- Select Field -->
    <select
      :id="computedId"
      :value="modelValue"
      :disabled="disabled"
      class="block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      :class="{
        'border-red-500 focus:border-red-500 focus:ring-red-500': errorMessage,
      }"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${computedId}-error` : undefined"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Error Message -->
    <p
      v-if="errorMessage"
      :id="`${computedId}-error`"
      class="mt-1 text-sm text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface SelectOption {
  value: string;
  label: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array as () => SelectOption[],
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// If user provides an ID use it, else generate one
const computedId = computed(
  () => props.id || `select-${Math.random().toString(36).substring(2, 10)}`
);
</script>
