<template>
  <BaseCard
    class="border-secondary text-secondary hover:shadow-inset-secondary hover:bg-secondary"
    @click="matchmaker.type = Difficulty.MASTER"
  >
    <Icon name="lucide:swords" class="w-24 h-24" />
    <div class="card-body max-w-xs">
      <h2 class="card-title lg:text-3xl text-xl">Master</h2>
      <p class="w-full text-xs">
        6 Consonants, 2 Vowels. Not for the faint of heart!
        <br />
        30 points.
      </p>
    </div>
  </BaseCard>
</template>
<script setup lang="ts">
import { Difficulty } from "~/types";
const matchmaker = useMatchmaker();
</script>
