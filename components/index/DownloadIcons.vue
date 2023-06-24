<template>
  <div
    class="grid grid-cols-2 lg:grid-cols-4 place-items-center py-18 mt-16 gap-y-16"
  >
    <div v-for="(platform, index) in platforms" class="flex flex-col">
      <Link
        :href="platform.url"
        v-motion="{
          initial: { opacity: 0, x: -30 },
          visibleOnce: {
            opacity: 1,
            x: 0,
            transition: { delay: index * 250 + 500 },
          },
        }"
      >
        <Icon
          :name="platform.icon"
          :key="platform.name"
          class="h-32 w-32 hover:text-base-100 transition-colors duration-200 ease-in-out"
        />
        <span class="text-center block">{{ platform.name }}</span>
      </Link>
    </div>
  </div>
</template>

<script setup lang="ts">
const platforms = ref([
  {
    name: "Windows",
    icon: "uil:windows",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/Spellsword_0.1.0_x64-setup.exe",
  },
  {
    name: "MacOS",
    icon: "uil:apple",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/Spellsword_0.1.0_x64.dmg",
  },
  {
    name: "Linux",
    icon: "uil:linux",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/spellsword_0.1.0_amd64.AppImage",
  },
  {
    name: "Android",
    icon: "uil:android",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/spellsword_0.1.0.apk",
  },
  {
    name: "iOS",
    icon: "uil:apple",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/spellsword_0.1.0.ipa",
  },
  {
    name: "Web",
    icon: "uil:globe",
    url: "https://spellsword.xyz",
  },
]);
</script>
