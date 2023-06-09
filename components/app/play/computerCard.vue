<template>
  <div class="card shadow-xl bg-opacity-90 grow-0 bg-green-200 text-primary">
    <figure>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M6 22v-4.25q-.975-.425-1.713-1.137T3.037 15q-.512-.9-.775-1.925T2 11q0-3.95 2.8-6.475T12 2q4.4 0 7.2 2.525T22 11q0 1.05-.263 2.075T20.963 15q-.513.9-1.25 1.613T18 17.75V22H6Zm2-2h1v-2h2v2h2v-2h2v2h1v-3.55q.95-.225 1.688-.75t1.25-1.25q.512-.725.787-1.6T20 11q0-3.125-2.212-5.063T12 4Q8.425 4 6.212 5.938T4 11q0 .975.275 1.85t.788 1.6q.512.725 1.262 1.25T8 16.45V20Zm2.5-5h3L12 12l-1.5 3Zm-2-2q.825 0 1.413-.588T10.5 11q0-.825-.588-1.413T8.5 9q-.825 0-1.413.588T6.5 11q0 .825.588 1.413T8.5 13Zm7 0q.825 0 1.413-.588T17.5 11q0-.825-.588-1.413T15.5 9q-.825 0-1.413.588T13.5 11q0 .825.588 1.413T15.5 13ZM12 20Z"
        />
      </svg>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-3xl">Computer</h2>
      <p class="hidden lg:block">
        Challenge an AI bot! Can you beat the computer?
      </p>
      <div class="card-actions justify-end">
        <button class="btn w-full" @click="emits('play', Difficulty.COMPUTER)">
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
