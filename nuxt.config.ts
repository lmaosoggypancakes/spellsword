// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-vitest",
  ],
  runtimeConfig: {
    public: {
      apiUrl: "https://spellsword.up.railway.app",
    },
  },
});
