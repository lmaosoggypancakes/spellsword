<template>
  <form
    class="mt-auto flex justify-center px-32 py-16 space-x-8 w-full"
    @submit.prevent="matchmaker.ready = true"
  >
    <label
      class="p-2 rounded-md border-2 text-info border-info hover:bg-info hover:text-primary transition cursor-pointer grow shadow-sm shadow-info inline-flex items-center justify-between"
      @click="matchmaker.toggleOpen()"
      for="play_mode_modal"
    >
      <span class="text-lg uppercase p-1">{{
        matchmaker.type || "choose difficulty"
      }}</span>
      <Icon
        name="ic:twotone-keyboard-arrow-up"
        class="h-8 w-8 p-0 float-right"
      />
    </label>
    <Button
      @click="matchmaker.ready = true"
      :disabled="!matchmaker.type || matchmaker.matchmaking"
      >Matchmake</Button
    >
  </form>
</template>

<script setup lang="ts">
import { Difficulty } from "types";

const matchmaker = useMatchmaker();
</script>
