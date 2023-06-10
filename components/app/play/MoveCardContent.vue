<template>
  <div
    :class="{
      'float-right': opponent,
    }"
  >
    <span class="block font-semibold no-underline">{{
      move.guess.toUpperCase()
    }}</span>
    <span
      class="inline-flex items-center font-bold text-sm px-2 py-1 bg-raisin rounded-md"
      :class="{
        'float-right': opponent,
      }"
      >+{{ move.points }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { Move } from "@/types";
defineProps<{
  move: Move;
  opponent: boolean;
}>();
</script>
