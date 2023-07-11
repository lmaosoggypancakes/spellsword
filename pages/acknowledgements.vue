<template>
  <div class="grid lg:grid-cols-2 grow lg:px-20 lg:overflow-y-hidden">
    <div class="flex flex-col items-center justify-center">
      <div
        v-motion-slide-visible-left
        class="text-center lg:text-left my-32 md:mt-0"
      >
        <span class="text-6xl font-bold">
          We
          <Icon name="uil:heart" />
          <span class="text-accent"> open source.</span>
        </span>
        <p class="text-2xl font-bold mt-4">
          Spellsword wouldn't be possible without the help of these amazing open
          source projects.
        </p>
      </div>
    </div>
    <div class="lg:p-8 overflow-hidden h-screen lg:h-auto">
      <ul
        class="w-full bg-primary h-full rounded-2xl flex overflow-hidden relative"
      >
        <div class="animate-marquee2 whitespace-nowrap absolute top-0 w-full">
          <NuxtLink
            v-for="lib in libraries"
            class="block mx-4 text-3xl text-center text-secondary hover:text-4xl transition-all duration-300 hover:text-accent"
            target="_blank"
            :to="lib.link"
            >{{ lib.name }}</NuxtLink
          >
        </div>
        <div class="animate-marquee whitespace-nowrap absolute top-0 w-full">
          <NuxtLink
            v-for="lib in libraries"
            class="block mx-4 text-3xl text-center text-secondary hover:text-4xl transition-all duration-300 hover:text-accent"
            target="_blank"
            :to="lib.link"
            >{{ lib.name }}</NuxtLink
          >
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Library } from "@/types";
definePageMeta({
  layout: "index",
});

const libraries = ref<Library[]>([
  {
    name: "@capacitor/cli",
    link: "https://www.npmjs.com/package/@capacitor/cli",
  },
  {
    name: "@nuxt/image",
    link: "https://www.npmjs.com/package/@nuxt/image",
  },
  {
    name: "@tailwindcss/typography",
    link: "https://www.npmjs.com/package/@tailwindcss/typography",
  },
  {
    name: "@types/howler",
    link: "https://www.npmjs.com/package/@types/howler",
  },
  { name: "daisyui", link: "https://www.npmjs.com/package/daisyui" },
  { name: "nuxt", link: "https://www.npmjs.com/package/nuxt" },
  {
    name: "nuxt-icon",
    link: "https://www.npmjs.com/package/nuxt-icon",
  },
  {
    name: "tailwind-scrollbar",
    link: "https://www.npmjs.com/package/tailwind-scrollbar",
  },
  {
    name: "typescript",
    link: "https://www.npmjs.com/package/typescript",
  },
  {
    name: "@capacitor/android",
    link: "https://www.npmjs.com/package/@capacitor/android",
  },
  {
    name: "@capacitor/assets",
    link: "https://www.npmjs.com/package/@capacitor/assets",
  },
  {
    name: "@capacitor/core",
    link: "https://www.npmjs.com/package/@capacitor/core",
  },
  {
    name: "@headlessui/vue",
    link: "https://www.npmjs.com/package/@headlessui/vue",
  },
  {
    name: "@heroicons/vue",
    link: "https://www.npmjs.com/package/@heroicons/vue",
  },
  {
    name: "@nuxtjs/tailwindcss",
    link: "https://www.npmjs.com/package/@nuxtjs/tailwindcss",
  },
  {
    name: "@pinia-plugin-persistedstate/nuxt",
    link: "https://www.npmjs.com/package/@pinia-plugin-persistedstate/nuxt",
  },
  {
    name: "@pinia/nuxt",
    link: "https://www.npmjs.com/package/@pinia/nuxt",
  },
  {
    name: "@tauri-apps/cli",
    link: "https://www.npmjs.com/package/@tauri-apps/cli",
  },
  {
    name: "@tauri-apps/core",
    link: "https://www.npmjs.com/package/@tauri-apps/core",
  },
  {
    name: "@vueuse/core",
    link: "https://www.npmjs.com/package/@vueuse/core",
  },
  {
    name: "@vueuse/motion",
    link: "https://www.npmjs.com/package/@vueuse/motion",
  },
  { name: "axios", link: "https://www.npmjs.com/package/axios" },
  { name: "howler", link: "https://www.npmjs.com/package/howler" },
  { name: "pinia", link: "https://www.npmjs.com/package/pinia" },
  {
    name: "pinia-plugin-persistedstate",
    link: "https://www.npmjs.com/package/pinia-plugin-persistedstate",
  },
  {
    name: "socket.io-client",
    link: "https://www.npmjs.com/package/socket.io-client",
  },
  {
    name: "vue-tippy",
    link: "https://www.npmjs.com/package/vue-tippy",
  },
]);
</script>
