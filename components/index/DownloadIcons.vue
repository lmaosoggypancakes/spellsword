<template>
  <div
    class="grid grid-cols-2 lg:grid-cols-4 place-items-center py-18 mt-16 gap-y-8 max-h-min overflow-hidden"
  >
    <div
      v-for="(platform, index) in platforms"
      class="flex flex-col p-4 transform transition ease-in hover:p-2"
      :class="index % 2 === 0 ? 'hover:rotate-12' : 'hover:-rotate-12'"
    >
      <LinkWithSound
        :href="platform.url"
        v-motion="{
          initial: { opacity: 0, x: -30 },
          visibleOnce: {
            opacity: 1,
            x: 0,
            transition: { delay: index * 250 + 250 },
          },
        }"
      >
        <Icon
          :name="platform.icon"
          :key="platform.name"
          class="h-32 w-32 transition duration-200 ease-in-out"
        />
        <span class="text-center block">{{ platform.name }}</span>
      </LinkWithSound>
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
    icon: "uil:apple-alt",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/Spellsword_0.1.0_x64.dmg",
  },
  {
    name: "Linux",
    icon: "uil:linux",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/spellsword_0.1.0_amd64.AppImage",
  },
  {
    name: "Android",
    icon: "uil:android-alt",
    url: "https://github.com/lmaosoggypancakes/spellsword/releases/download/app-v0.1.0/spellsword_0.1.0.apk",
  },
  {
    name: "Web",
    icon: "uil:globe",
    url: "https://spellsword.xyz",
  },
]);
</script>
