<template>
  <div
    class="grid xl:grid-cols-2 p-4 items-center overflow-hidden min-h-screen relative"
    id="about"
  >
    <div class="h-screen z-10 absolute grid justify-between">
      <div
        class="h-4 w-12 opacity-20 flex items-center space-x-1 transition-transform z-20 -translate-x-24"
        v-for="(letter, idx) in travellingLetters"
        :id="`star-${idx}`"
        :style="{
          opacity: letter.start ? 100 : 0,
        }"
      >
        <span class="w-8 h-1 border-b border-opacity-20 border-white"></span
        ><span class="animate-spin-slow">{{ letter.value }}</span>
      </div>
    </div>
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
      <p class="text-5xl mb-8 transform uppercase">
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
        class="hover:rounded-lg shadow-lg mx-auto h-36 w-36 inline-block p-2 hover:p-0 rounded-2xl transition-all z-10"
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

const letters = [...generateRandomSequence(), ...generateRandomSequence()].map(
  (letter) => letter.value
);
const travellingLetters = ref<
  { start: boolean; ended: boolean; value: string }[]
>([]);
letters.forEach((letter) => [
  travellingLetters.value.push({
    start: false,
    ended: false,
    value: letter,
  }),
]);

onMounted(() => {
  setInterval(() => {
    travellingLetters.value.forEach((letter, idx) => {
      const star = document.getElementById(`star-${idx}`);
      if (!star) return;
      if (!star.classList.contains("star")) {
        if (Math.round(Math.random() * 1000) == 1) {
          // animate it
          star.classList.add("star");
          // make it visible
          letter.start = true;
        }
      }
    });
  }, 10);
});
// from the images, create another list of 8 random images
// this is to avoid having the same image twice
</script>

<style>
@keyframes fly {
  to {
    transform: translateX(100vw);
  }
}

.star {
  animation: fly forwards 10s infinite ease-in;
}
</style>
