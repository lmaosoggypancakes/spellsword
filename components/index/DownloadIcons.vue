<template>
  <div class="flex justify-center py-18">
    <Icon
      v-for="platform in platforms"
      :name="platform.icon"
      :key="platform.name"
    />
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
]);
</script>
