<template>
  <div class="card shadow-xl bg-opacity-80 grow-0 bg-accent text-primary">
    <figure>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13m9-13v13m9-13v13"
        />
      </svg>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-3xl">Casual</h2>
      <p class="hidden lg:block">12 Consonants, 6 Vowels</p>
      <div class="card-actions justify-end">
        <button class="btn w-full" @click="emits('play', Difficulty.CASUAL)">
          Play
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Difficulty } from "~/types";
// define play emit
const emits = defineEmits(["play"]);
</script>
