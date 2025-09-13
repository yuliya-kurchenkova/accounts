<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string,
  errorMessage?: string | boolean
}>(), {
  modelValue: "",
  label: "",
  placeholder: "",
  errorMessage: "",
});

const isFocused = ref(false);

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
  (e: "blur"): void
  (e: "focus"): void
}>();

const errorText = computed(() => {
  if (typeof props.errorMessage === 'string') return props.errorMessage
  return props.errorMessage ? 'Ошибка ввода' : ''
});

const hasError = computed(() => !!errorText.value);

function updateInputValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}

function onFocus() {
  isFocused.value = true;
  emit("focus");
}

function onBlur() {
  isFocused.value = false;
  emit("blur");
}

</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label :for="label" class="text-sm font-medium text-gray-600 sm:text-base dark:text-gray-300">
      {{ label }}
    </label>
    <input 
      :value="modelValue"
      @input="updateInputValue" 
      :id="label" 
      v-bind="$attrs" 
      :placeholder="placeholder"
      :class="hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'"
      class="rounded-md border px-4 py-2 text-sm shadow-sm focus:border-indigo-600 focus:ring-1 sm:rounded-lg sm:text-base placeholder:opacity-100 placeholder:text-white bg-transparent text-white" 
      @blur="onBlur"
      @focus="onFocus"/>
    <p v-if="hasError" class="text-xs text-red-500">
      {{ errorText }}
    </p>
  </div>
</template>