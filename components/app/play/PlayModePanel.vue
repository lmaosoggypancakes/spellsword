<template>
  <div
    class="rounded-xl col-span-3 space-y-4 w-full flex flex-col justify-between"
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
