<script setup lang="ts">

const login = useLoginFieldStore();
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between border-b border-gray-700/20 pb-4 pt-8">
        <h1 class="text-3xl font-bold tracking-tight text-white/90 drop-shadow-lg">
          <span class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Учётные записи
          </span>
        </h1>
        <Icon name="plus" class="h-8 w-8 text-sky-400 transition-transform group-hover:scale-110 group-active:scale-95" />
      </div>
    </div>
    <UiInputBase 
      v-model="login.value" 
      :error-message="login.touched && !login.isValid ? login.error : ''" 
      @blur="login.onBlur"/>
  </main>
</template>