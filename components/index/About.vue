<template>
  <div
    class="grid xl:grid-cols-2 p-4 items-center overflow-hidden min-h-screen"
    id="about"
  >
    <div
      class="text-2xl p-4"
      v-motion="{
        initial: { opacity: 0, x: 30 },
        visibleOnce: {
          opacity: 1,
          x: 0,
          transition: { delay: 500 },
        },
      }"
    >
      <p class="text-5xl mb-8 transform">
        Embark on a quest and conquer rivals
      </p>
      With over
      <span class="underline font-extrabold text-accent"
        >15 customized avatars</span
      >
      to choose from, you can immerse yourself in a futuristic world of magic
      and learning. Compete with other players in real-time and climb the ranks!
    </div>
    <div
      class="grid grid-rows-2 grid-cols-2 lg:grid-rows-4 lg:grid-cols-4 gap-x-0 gap-y-4 mt-24 xl:mt-0"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :alt="`image-${index}`"
        class="hover:rounded-lg shadow-lg mx-auto h-36 w-36 inline-block p-2 hover:p-0 rounded-2xl transition-all"
        :class="[
          index % 2 === 1 ? 'mt-0' : 'mt-2',
          index == 0 || index == 15 ? 'opacity-0' : 'opacity-100',
        ]"
        v-motion="{
          initial: { opacity: 0, blur: 10, y: 0 },
          visibleOnce: {
            opacity: index == 0 || index == 15 ? 0 : 1,
            blur: 0,
            y: index % 2 === 0 ? -72 : 0,
            transition: { delay: index * 10 + 250, duration: 500 },
          },
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const images = Array(16)
  .fill(0)
  .map(
    (_, i) =>
      `https://spellsword.up.railway.app/static/images/avatars/${i + 1}.png`
  );

// from the images, create another list of 8 random images
// this is to avoid having the same image twice
</script>
