import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/icon", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  icon: {
    mode: "svg",
    aliases: {
      del: "heroicons:archive-box-x-mark-solid",
      plus: "heroicons:plus-circle",
      close: "heroicons:lock-closed-16-solid",
      open: "heroicons:lock-open-16-solid",
      question: "heroicons:question-mark-circle-solid"
    },
  },
});
