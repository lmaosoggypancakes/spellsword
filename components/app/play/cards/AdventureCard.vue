<template>
  <BaseCard @click="matchmaker.type = Difficulty.ADVENTURE">
    <Icon name="lucide:shield" class="w-24 h-24" />
    <div class="card-body max-w-xs">
      <h2 class="card-title lg:text-3xl text-xl">Adventure</h2>
      <p class="text-xs">
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
