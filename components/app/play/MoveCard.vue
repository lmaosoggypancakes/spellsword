<template>
  <div
    class="w-full p-4 flex text-apricot"
    v-motion="{
      initial: {
        y: 100,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
      },
    }"
  >
    <div
      class="rounded-md grow bg-primary p-4 border-apricot border-2"
      :class="{ 'grayscale border-0': !move.valid }"
    >
      <tippy v-if="move.definition" :content="move.definition">
        <MoveCardContent :move="move" :opponent="opponent"
      /></tippy>
      <MoveCardContent :move="move" :opponent="opponent" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Move } from "@/types";
defineProps<{
  move: Move;
  opponent: boolean;
}>();
</script>
