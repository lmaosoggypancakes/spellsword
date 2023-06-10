<template>
  <div class="card shadow-xl bg-opacity-80 grow-0 bg-secondary text-primary">
    <figure>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m19.05 21.6l-2.925-2.9l-2.2 2.2l-.7-.7q-.575-.575-.575-1.425t.575-1.425l4.225-4.225q.575-.575 1.425-.575t1.425.575l.7.7l-2.2 2.2l2.9 2.925q.3.3.3.7t-.3.7l-1.25 1.25q-.3.3-.7.3t-.7-.3ZM22 5.9L10.65 17.25l.125.1q.575.575.575 1.425t-.575 1.425l-.7.7l-2.2-2.2l-2.925 2.9q-.3.3-.7.3t-.7-.3L2.3 20.35q-.3-.3-.3-.7t.3-.7l2.9-2.925l-2.2-2.2l.7-.7q.575-.575 1.425-.575t1.425.575l.1.125L18 1.9h4v4ZM8.35 9.425l.6-.575l.575-.6l-.575.6l-.6.575Zm-1.4 1.425L2 5.9v-4h4l4.95 4.95l-1.425 1.4l-4.35-4.35H4v1.175l4.35 4.35l-1.4 1.425Zm2.3 4.975L20 5.075V3.9h-1.175L8.075 14.65l1.175 1.175Zm0 0l-.6-.575l-.575-.6l.575.6l.6.575Z"
        />
      </svg>
    </figure>
    <div class="card-body">
      <h2 class="card-title text-3xl">Master</h2>
      <p class="hidden lg:block">
        6 Consonants, 2 Vowels. Not for the faint of heart!
      </p>
      <div class="card-actions justify-end">
        <button
          class="btn w-full border-0"
          @click="emits('play', Difficulty.MASTER)"
        >
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
