<template>
  <li
    :id="String(letter.id)"
    class="lg:text-3xl border-2 bg-base-100 rounded-xl transition-all cursor-pointer flex items-center justify-center w-16 h-16 hover:rounded-none"
    :class="{
      'grayscale blur-sm': letter.active && !queue,
      'hover:shadow-inset-info ': !letter.active,
      // 'bg-blue-400 bg-opacity-30 text-seasalt border-blue-400': letter,
    }"
    @click="handleClick"
  >
    {{ letter.value }}
  </li>
</template>

<script setup lang="ts">
import { Letter } from "~~/types";

const props = defineProps<{
  letter: Letter;
  disabled: boolean;
  queue?: boolean;
}>();
const emits = defineEmits<{
  (e: "toggle", val: Letter): void;
}>();

const handleClick = () => {
  emits("toggle", props.letter);
};
</script>
