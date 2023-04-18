<template>
  <div
    class="bg-tea_green p-4 fixed bottom-2 right-2 rounded-md flex text-primary"
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
    Finding match
    <ArrowPathIcon class="ml-4 w-6 h-6 animate-spin" />
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
</script>
