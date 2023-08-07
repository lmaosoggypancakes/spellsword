<template>
  <div class="min-h-screen bg-base-100 text-info grid grid-cols-5 font-sans">
    <ul
      class="text-secondary font-normal grid grid-rows-5 grid-cols-2 justify-end place-items-center pl-4"
      v-motion-fade
    >
      <LetterBlock
        v-for="letter in Object.keys(letters_1)"
        :letter="{ value: letter, id: letter, active: false }"
        :key="letter"
        :disabled="false"
        :style="`transform: rotate(${letters_1[letter]}deg)`"
      />
    </ul>
    <div class="col-span-3">
      <h1
        class="text-info mx-auto text-center text-shadow-sm shadow-info"
        :style="`font-size: 3rem`"
      >
        The battlefield is yours
      </h1>
    </div>
    <ul
      class="text-secondary font-normal grid grid-rows-5 grid-cols-2 justify-start place-items-center pr-4 text-3xl"
      v-motion-fade
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
import { useWindowScroll } from '@vueuse/core';

const download: Ref<null | HTMLElement> = ref(null);
const scroll = useWindowScroll();

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
</script>
