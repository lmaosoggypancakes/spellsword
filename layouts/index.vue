<template>
  <div
    class="w-full font-bold min-h-screen overflow-scroll flex flex-col scrollbar-none"
  >
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <NuxtLink href="/" class="btn btn-ghost normal-case text-3xl"
          >Spellsword</NuxtLink
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <div class="flex justify-end space-x-2">
            <LinkWithSound href="/login" class="btn btn-outline btn-secondary"
              >Login</LinkWithSound
            >
            <LinkWithSound href="/register" class="btn btn-secondary"
              >Register</LinkWithSound
            >
          </div>
        </ul>
      </div>
    </div>
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
