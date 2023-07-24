<template>
  <BaseCard
    class="border-green-200 text-green-200 hover:shadow-inset-[rgb(187 247 208)] hover:bg-green-200 hover:text-primary"
    @click="matchmaker.type = Difficulty.COMPUTER"
  >
    <Icon name="lucide:skull" class="w-24 h-24" />
    <div class="card-body max-w-xs">
      <h2 class="card-title lg:text-3xl text-xl">Computer</h2>
      <p class="max-w-xs w-full text-xs">
        Challenge an AI bot! Can you beat the computer?
      </p>
    </div>
  </BaseCard>
</template>
<script setup lang="ts">
import { Difficulty } from "~/types";
const matchmaker = useMatchmaker();
</script>
