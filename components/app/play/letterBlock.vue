<template>
  <li
    :id="String(letter.id)"
    class="text-center relative inline-block h-16 w-16 p-4 border-2 border-secondary rounded-md bg-raisin transition-all cursor-pointer"
    :class="{
      grayscale: letter.active && !letter.inQueue,
      'hover:mt-4': !letter.active && !letter.inQueue,
      'bg-blue-400 bg-opacity-30 text-seasalt border-blue-400': letter.inQueue,
    }"
    @click="$emit('toggle', letter)"
  >
    {{ letter.value }}
  </li>
</template>

<script setup lang="ts">
import { Letter } from "~~/types";

const props = defineProps<{
  letter: Letter;
}>();

const emits = defineEmits<{
  toggle: Letter;
}>();
</script>
