<template>
  <BaseCard @click="matchmaker.type = Difficulty.CASUAL">
    <Icon name="lucide:sword" class="w-24 h-24" />
    <div class="card-body max-w-xs">
      <h2 class="card-title lg:text-3xl text-xl">Casual</h2>
      <p class="lg:max-w-xs lg:text-xs">
        9 Consonants, 4 Vowels. Practice your Spellsword abilities in a fun and
        playful way!
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { Difficulty } from "~/types";
const matchmaker = useMatchmaker();
</script>
