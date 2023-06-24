<template>
  <li
    :id="String(letter.id)"
    class="text-center text-2xl relative inline-block h-14 w-16 p-2 border-2 bg-base-100 rounded-md transition-all cursor-pointer"
    :class="{
      'grayscale blur-sm': letter.active && !queue,
      'hover:shadow-[inset_0_0_10px_rgba(169,255,203,1)] ': !letter.active,
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
