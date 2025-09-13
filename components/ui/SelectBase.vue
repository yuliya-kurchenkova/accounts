<script setup lang="ts">
import { computed } from "vue";

type SelectOption = { label: string; value: string };

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  options: SelectOption[]
  errorMessage?: string | boolean
}>(), {
  modelValue: "",
  label: "Тип записи",
  placeholder: "Выберите тип",
  errorMessage: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void
  (e: "change", v: string): void
  (e: "blur"): void
  (e: "focus"): void
}>();

const hasError = computed(() =>
  typeof props.errorMessage === "string" ? !!props.errorMessage : !!props.errorMessage
);

const errorText = computed(() =>
  typeof props.errorMessage === "string" ? props.errorMessage : (props.errorMessage ? "Ошибка ввода" : "")
);

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value;
  emit("update:modelValue", v);
  emit("change", v);
}

</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-600 sm:text-base dark:text-gray-300">
      {{ label }}
    </label>
    <select 
      :value="modelValue" 
      @change="onChange" 
      @focus="$emit('focus')" 
      @blur="$emit('blur')" 
      class="w-full rounded-md border px-4 py-2 text-sm shadow-sm focus:border-indigo-600 focus:ring-1
             sm:rounded-lg sm:text-base bg-transparent text-white
             dark:border-0 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400"
      :class="hasError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'">
      <option value="" disabled hidden>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" class="text-black">
        {{ option.label }}
      </option>
    </select>

    <p v-if="hasError" class="text-xs text-red-500">{{ errorText }}</p>
  </div>
</template>