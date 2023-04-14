<template>
  <div
    class="w-full p-4 flex text-apricot"
    :class="{ grayscale: !move.valid }"
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
    <div class="rounded-md grow bg-primary p-4 border-apricot border-2">
      <tippy v-if="move.definition" :content="move.definition">
        <MoveCardContent :move="move" :opponent="opponent"
      /></tippy>
      <MoveCardContent :move="move" :opponent="opponent" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Move } from "@/types";
import MoveCardContent from "@/components/app/play/moveCardContent.vue";
defineProps<{
  move: Move;
  opponent: boolean;
}>();
</script>
