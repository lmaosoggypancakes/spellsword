<template>
  <div
    class="w-full font-bold min-h-screen overflow-scroll flex flex-col scrollbar-none relative"
  >
    <LandingNavbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Spellsword | Master language through competitive games",
  ogTitle: "Spellsword | Master language through competitive games",
  description:
    "Spellsword is an interactive web-based game designed to improve our command of the english language. Through real-time competitive games, players will be able to improve their vocabulary and spelling skills.",
  ogDescription:
    "Spellsword is an interactive web-based game designed to improve our command of the english language. Through real-time competitive games, players will be able to improve their vocabulary and spelling skills.",
  ogImage: "https://spellsword.xyz/logo.png",
});
</script>
