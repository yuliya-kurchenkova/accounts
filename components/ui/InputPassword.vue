<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  errorMessage?: string | boolean
}>(), {
  modelValue: "",
  label: "Пароль",
  placeholder: "Введите пароль",
  errorMessage: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
  (e: "blur"): void
  (e: "focus"): void
}>();

const isFocused = ref(false);
const show = ref(false);

const errorText = computed(() =>
  typeof props.errorMessage === "string" ? props.errorMessage : (props.errorMessage ? "Ошибка ввода" : "")
);
const hasError = computed(() => !!errorText.value);
const type = computed(() => (show.value ? "text" : "password"));

function updateInputValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
function onFocus() { 
  isFocused.value = true; emit("focus"); 
}
function onBlur()  { 
  isFocused.value = false; emit("blur"); 
}
function toggle()  { 
  show.value = !show.value; 
}
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label :for="label" class="text-sm font-medium text-gray-600 sm:text-base dark:text-gray-300">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="label"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="updateInputValue"
        @focus="onFocus"
        @blur="onBlur"
        class="w-full rounded-md border px-4 py-2 pr-10 text-sm shadow-sm focus:border-indigo-600 focus:ring-1
               sm:rounded-lg sm:text-base
               bg-transparent text-white placeholder:text-white placeholder:opacity-100 caret-white
               dark:border-0 dark:bg-gray-700 dark:text-white dark:placeholder:text-white dark:focus:ring-indigo-400"
        :class="hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'"
      />
      <button
        type="button"
        @click="toggle"
        :aria-pressed="show"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-80 hover:opacity-100"
        :title="show ? 'Скрыть пароль' : 'Показать пароль'"
      >
        <Icon v-if="!show" name="close" class="h-4 w-4 text-sky-400 transition-transform group-hover:scale-110 group-active:scale-95" />
        <Icon v-else name="open" class="h-4 w-4 text-sky-400 transition-transform group-hover:scale-110 group-active:scale-95" /> 
      </button>
    </div>

    <p v-if="hasError" :id="`${label}-error`" class="text-xs text-red-500">
      {{ errorText }}
    </p>
  </div>
</template>