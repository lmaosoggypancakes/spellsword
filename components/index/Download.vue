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
    </div>
    <div
      class="text-info font-normal md:flex flex-col space-y-8 items-center justify-center pl-4 hidden relative h-screen"
      v-motion-fade
    >
      <div
        class="border border-accent border-opacity-80 overflow-hidden animate-spin-super-slow-backwards group/letter"
      >
        <img
          src="~/assets/letter_hero.png"
          class="w-[30vw] to-70% -z-10 animate-spin-super-slow p-10"
        />
      </div>
      <LetterBlock
        v-for="letter in letters"
        :letter="{ value: letter, id: letter, active: false }"
        :key="letter"
        :disabled="false"
        class="bg-primary border-info circle absolute shadow-info ease-in-out duration-300 hover:duration-500 group-hover/letter:duration-1000"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

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
</script>
