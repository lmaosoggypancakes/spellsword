<template>
  <div
    class="lg:w-5/6 w-full p-2 flex flex-col border-2 rounded-2xl bg-primary lg:pl-4 last:mt-36"
    onclick="modal.showModal()"
  >
    <div class="text-white flex justify-between w-full">
      <span class="float-left flex items-center">
        <div class="avatar">
          <div class="w-12 lg:w-24 rounded-xl">
            <img :src="stats.player.picture" />
          </div>
        </div>
        <span class="lg:text-2xl ml-4 bg-accent p-3 rounded-xl text-primary">{{
          stats.playerPoints
        }}</span>
      </span>
      <p
        class="hidden md:flex lg:text-3xl text-center my-4 font-bold tracking-widest flex-col justify-center lg:w-full w-12"
      >
        {{ stats.characters }}
      </p>
      <span class="float-right flex items-center">
        <span class="lg:text-2xl mr-4 bg-accent p-3 rounded-xl text-primary">{{
          stats.opponentPoints
        }}</span>
        <div class="avatar float-right">
          <div class="w-12 lg:w-24 rounded-xl">
            <img :src="stats.opponent.picture" />
          </div>
        </div>
      </span>
    </div>
    <div>
      <span class="lg:text-lg truncate w-24 inline-block text-ellipsis">{{
        stats.player.username
      }}</span>

      <span class="lg:text-lg float-right truncate w-24">{{
        stats.opponent.username
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameStatistics } from "@/types";

defineProps<{
  stats: GameStatistics;
}>();
</script>
