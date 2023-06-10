<template>
  <div
    class="rounded-xl col-span-3 grid gap-y-4 gap-x-8 lg:grid-rows-2 lg:grid-cols-2 h-full"
  >
    <component
      v-for="mode in modes"
      :is="mode"
      @play="(e: Difficulty) => emits('matchmake', e)"
    ></component>
  </div>
</template>

<script setup lang="ts">
import CasualCard from "./cards/CasualCard.vue";
import AdventureCard from "./cards/AdventureCard.vue";
import MasterCard from "./cards/MasterCard.vue";
import ComputerCard from "./cards/ComputerCard.vue";
import { Difficulty } from "~/types";
const props = defineProps<{
  primary?: boolean; // takes up 3 cols instead of 1
  disabled?: boolean;
}>();
const modes = [CasualCard, AdventureCard, MasterCard, ComputerCard];
const emits = defineEmits(["matchmake"]);
</script>
