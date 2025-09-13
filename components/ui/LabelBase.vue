<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  errorMessage?: string | boolean
  multiline?: boolean
  rows?: number
}>(), {
  modelValue: "",
  label: "Метки",
  placeholder: "",
  errorMessage: "",
  multiline: true,
  rows: 2
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
  (e: "blur"): void
  (e: "focus"): void
}>();

const isFocused = ref(false);
const errorText = computed(() =>
  typeof props.errorMessage === "string" ? props.errorMessage : (props.errorMessage ? "Ошибка ввода" : "")
);
const hasError = computed(() => !!errorText.value);

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  emit("update:modelValue", val);
}
function onFocus() {
  isFocused.value = true; emit("focus");
}
function onBlur() {
  isFocused.value = false; emit("blur");
}
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label v-if="label" :for="label" class="text-sm font-medium text-gray-600 sm:text-base dark:text-gray-300">
      {{ label }}
    </label>

    <component :is="multiline ? 'textarea' : 'input'" :id="label" :rows="multiline ? rows : undefined"
      :value="modelValue ?? ''" :placeholder="placeholder" v-bind="$attrs" @input="onInput" @focus="onFocus"
      @blur="onBlur" class="h-[42px] w-full rounded-md border px-4 py-2 text-sm shadow-sm focus:border-indigo-600 focus:ring-1
             sm:rounded-lg sm:text-base bg-transparent text-white placeholder:text-white placeholder:opacity-100 caret-white
             dark:border-0 dark:bg-gray-700 dark:text-white dark:placeholder:text-white dark:focus:ring-indigo-400"
      :class="hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'" />
    <p v-if="hasError" class="text-xs text-red-500">{{ errorText }}</p>
  </div>
</template>