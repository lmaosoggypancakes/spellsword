<template>
  <div class="min-h-screen bg-base-100 text-info grid grid-cols-5 font-sans">
    <ul
      class="text-secondary font-normal md:grid grid-rows-5 grid-cols-2 justify-end place-items-center pl-4 hidden"
      v-motion-fade
      ref="left"
    >
      <LetterBlock
        v-for="letter in Object.keys(letters_1)"
        :letter="{ value: letter, id: letter, active: false }"
        :key="letter"
        :disabled="false"
        :style="`transform: rotate(${letters_1[letter]}deg)`"
      />
    </ul>
    <div class="md:col-span-3 col-span-5">
      <h1
        class="text-info w-full text-center text-shadow-sm shadow-info uppercase"
        :style="`font-size: ${headerFontSize}rem`"
      >
        The battlefield is yours
      </h1>
    </div>
    <ul
      class="text-secondary font-normal md:grid grid-rows-5 grid-cols-2 justify-start place-items-center pr-4 text-3xl hidden"
      v-motion-fade
      ref="right"
    >
      <LetterBlock
        v-for="letter in Object.keys(letters_2)"
        :letter="{ value: letter, active: false }"
        :disabled="false"
        :style="`transform: rotate(${letters_2[letter]}deg)`"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { useMotion } from "@vueuse/motion";

const download: Ref<null | HTMLElement> = ref(null);
const scroll = useWindowScroll();
const left = ref<HTMLElement>();
const right = ref<HTMLElement>();

const headerFontSize = computed(() => {
  if (scroll.y.value < 800) return 4;
  if (scroll.y.value > 1000) return 3;
  return 5 - (scroll.y.value - 600) / 200;
});
// create an object with letter_1 as the keys and randomly generated numbers as each valuer
const letters_1 = ["A", "O", "C", "P", "L", "K", "R", "F", "I", "Q"].reduce(
  (acc, curr) => {
    acc[curr] = Math.round(Math.random() * -45);
    return acc;
  },
  {}
);
const letters_2 = [
  "K",
  "T",
  "V",
  "N",
  "I",
  "A",
  "R",
  "V",
  "E",
  "U",
  "B",
].reduce((acc, curr) => {
  acc[curr] = Math.round(Math.random() * 45);
  return acc;
}, {});

// const props = defineProps<{
//   rank: "silver" | "gold" | "radiant" | "diamond";
// }>();
// const getImageUrl = () => {
//   const url = new URL(`/assets/ranks/${props.rank}.png`, import.meta.url);
//   return url;
// };
const leftMotion = useMotion(left, {
  initial: { opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      onComplete: () => {
        try {
          leftMotion.value = "levitate";
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
  levitate: {
    y: 15,
    transition: {
      duration: 2000,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror",
    },
  },
});
const rightMotion = useMotion(right, {
  initial: { opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      onComplete: () => {
        try {
          rightMotion.value = "levitate";
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
  levitate: {
    y: 15,
    transition: {
      duration: 2000,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror",
    },
  },
});
</script>
