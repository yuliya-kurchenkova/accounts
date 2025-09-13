<script setup lang="ts">

const accountsStore = useAccountsStore();
const options = [
  { label: "LDAP", value: "LDAP" },
  { label: "Локальная", value: "Локальная" },
];
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
        <button @click="accountsStore.addEmpty">
          <Icon name="plus" class="h-8 w-8 text-sky-400 hover:scale-110 active:scale-95 transition-transform" />
        </button>
      </div>
    </div>

    <UiHint class="mx-auto w-max p-4 rounded-lg" icon="question"
            message="Для указания нескольких меток используйте разделитель ;" />

    <div class="mt-6 flex flex-col gap-6">
      <div v-for="acc in accountsStore.accounts" :key="acc.id"
           class="mx-auto flex items-start gap-6 border-b border-gray-700/30 pb-4">
        <UiLabelBase
          v-model="acc.labelsRaw"
          label="Метки"
          placeholder="Введите метки"
          :multiline="true" :rows="2"
          :error-message="accountsStore.errorsById.get(acc.id)?.labels || ''"
          @blur="accountsStore.commit(acc.id, 'labels')"
        />
        <UiSelectBase
          v-model="acc.type"
          :options="options"
          label="Тип записи"
          placeholder="Выберите тип"
          :error-message="accountsStore.errorsById.get(acc.id)?.type || ''"
          @change="(v:string)=>{ accountsStore.setField(acc.id,'type', v as any); accountsStore.commit(acc.id,'type'); }"
        />
        <UiInputBase
          v-model="acc.login"
          label="Логин"
          placeholder="Введите логин"
          :error-message="accountsStore.errorsById.get(acc.id)?.login || ''"
          @blur="accountsStore.commit(acc.id, 'login')"
        />
        <UiInputPassword
          v-if="acc.type === 'Локальная'"
           v-model="acc.password"
          label="Пароль"
          placeholder="Введите пароль"
          :error-message="accountsStore.errorsById.get(acc.id)?.password || ''"
          @blur="accountsStore.commit(acc.id, 'password')"
        />
        <button type="button" @click="accountsStore.removeAccount(acc.id)"
                class="mt-6 rounded p-2 hover:bg-red-500/20">
          <Icon name="del" class="h-6 w-6 text-red-400" />
        </button>
      </div>
    </div>
  </main>
</template>