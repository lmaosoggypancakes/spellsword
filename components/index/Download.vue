<template>
  <div
    class="min-h-screen bg-base-100 text-info font-sans py-9 overflow-x-hidden"
  >
    <div class="md:col-span-5 col-span-7">
      <h1
        class="text-info w-full text-center text-shadow-sm shadow-info uppercase"
        :style="`font-size: ${headerFontSize}rem`"
      >
        The battlefield is yours
      </h1>
      <p class="text-center text-white text-xl font-normal">
        Spellsword is played between two players who race against the clock
      </p>
    </div>
    <div
      class="text-info font-normal md:flex flex-col space-y-8 items-center justify-center pl-4 hidden relative h-screen"
      v-motion-fade
    >
      <div
        class="overflow-hidden group/letter bg-transparent outline-info outline-dashed outline-4 rounded-full animate-spin-super-slow-backwards -outline-offset-8 p-16"
      >
        <div
          class="z-50 w-96 h-96 inline-grid overflow-clip rounded-3xl animate-spin-super-slow p-4"
        >
          <img
            v-for="id in imageIds"
            :src="`https://spellsword.up.railway.app/static/images/avatars/${id}.png`"
            class="opacity-100 transition-all ease-out object-cover hover:scale-105 rounded-full shadow-md shadow-secondary"
            style="grid-column: 1; grid-row: 1"
            :class="id != currentAvatar && 'invisible translate-x-96'"
          />
        </div>
      </div>
      <LetterBlock
        v-for="letter in letters"
        :letter="{ value: letter, id: letter, active: false }"
        :key="letter"
        :disabled="false"
        class="bg-primary border-info circle absolute shadow-info ease-in-out duration-300 hover:duration-500 group-hover/letter:duration-1000 stack z-50"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
const imageIds = Array(10)
  .fill(0)
  .map((_, idx) => idx + 1);
console.log(imageIds);
const currentAvatar = ref(1);
const download: Ref<null | HTMLElement> = ref(null);
const scroll = useWindowScroll();

const headerFontSize = computed(() => {
  if (scroll.y.value < 800) return 4;
  if (scroll.y.value > 1000) return 3;
  return 5 - (scroll.y.value - 600) / 200;
});
// create an object with letter_1 as the keys and randomly generated numbers as each valuer
const letters = generateRandomSequence().map((letter) => letter.value);
console.log(letters);
const angle = ref(0);
const computeLetterCircles = (angle: number) => {
  if (!document) return; // stfu build error
  try {
    const circles = <HTMLUListElement[]>document.querySelectorAll(".circle");
    let dangle = 360 / circles.length;
    circles.forEach((circle, index) => {
      angle += dangle;
      circle.style.transform = `rotate(${angle}deg) translateX(${
        window.innerWidth / 5
      }px) rotate(-${angle}deg)`;
      if (Math.round(Math.random() * 100) == 1) {
        if (circle.classList.contains("shadow-2xl")) {
          circle.classList.remove("shadow-2xl", "shadow-accent");
        } else {
          circle.classList.add("shadow-2xl", "shadow-accent");
        }
      }
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

onMounted(() => computeLetterCircles(0));
setInterval(() => {
  angle.value += 1;
  computeLetterCircles(angle.value);
}, 100);

setInterval(() => {
  if (currentAvatar.value == imageIds.length) {
    currentAvatar.value = 1;
  } else {
    currentAvatar.value += 1;
  }
}, 2000);
</script>

<style>
.funny {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2377E4EEFF' stroke-width='3' stroke-dasharray='21' stroke-dashoffset='9' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 9999px;
}
</style>
