// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  nitro: {},
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
    "nuxt-icon",
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
  sound: {
    sounds: {
      click: {
        src: "/assets/button_click.mp3",
        options: {
          volume: 0.5,
        },
      },
    },
  },
});
