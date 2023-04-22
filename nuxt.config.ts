// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-vitest",
    "@vueuse/motion/nuxt",
  ],
  piniaPersistedstate: {
    cookieOptions: { sameSite: "strict" },
    debug: true,
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:8000",
    },
  },
});
