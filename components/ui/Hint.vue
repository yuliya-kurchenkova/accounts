<script setup lang="ts">
const props = withDefaults(defineProps<{
  message?: string
  icon?: string
}>(), {
  message: "",
  icon: "info",
});
</script>

<template>
  <div class="flex items-start gap-2 rounded-md px-3 py-2 text-white">
    <Icon v-if="icon" :name="icon" class="mt-0.5 h-4 w-4 shrink-0 opacity-95" />
    <p class="text-xs leading-5 sm:text-sm text-white">
      <slot>{{ message }}</slot>
    </p>
  </div>
</template>