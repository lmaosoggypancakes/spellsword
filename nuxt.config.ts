// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/motion/nuxt",
  ],
  piniaPersistedstate: {
    debug: true,
    storage: "cookies",
  },
  runtimeConfig: {
    public: {
      apiUrl: "https://spellsword.up.railway.app",
      // apiUrl: "http://localhost:8000",
    },
  },
});
