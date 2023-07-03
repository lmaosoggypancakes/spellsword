<template>
  <div class="grid lg:grid-cols-2 h-full">
    <nuxt-img
      class="mx-auto my-auto lg:block hidden"
      src="/logo.png"
      height="256"
      width="256"
    />
    <div class="h-full flex items-center">
      <div class="h-[80%] w-full flex flex-col items-center space-y-8">
        <nuxt-img
          class="block lg:hidden"
          src="/logo.png"
          height="128"
          width="128"
        />
        <span class="text-5xl text-center">Spellsword</span>
        <p class="text-center font-normal">
          An interactive word-based game designed to improve our command of the
          english language.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});

const username = ref("");
</script>
