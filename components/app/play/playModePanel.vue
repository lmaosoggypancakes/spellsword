<template>
  <div
    class="rounded-xl col-span-3 grid gap-y-4 gap-x-8 lg:grid-rows-2 lg:grid-cols-2 h-full"
  >
    <div
      class="card shadow-xl bg-opacity-80 grow-0"
      v-for="mode in modes"
      :class="
        mode.name === 'Master'
          ? 'bg-secondary text-primary'
          : 'bg-accent text-primary'
      "
    >
      <figure v-html="mode.icon"></figure>
      <div class="card-body">
        <h2 class="card-title text-3xl">
          {{ mode.name }}
        </h2>
        <p class="hidden lg:block">{{ mode.desc }}</p>
        <div class="card-actions justify-end">
          <button
            class="btn w-full"
            :class="
              mode.name === 'Master'
                ? 'btn-secondary border-0 text-primary'
                : ''
            "
          >
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  primary?: boolean; // takes up 3 cols instead of 1
  disabled?: boolean;
}>();
const modes = [
  {
    name: "Casual",
    desc: "12 Consonants, 6 Vowels",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13m9-13v13m9-13v13"/></svg>`,
  },
  {
    name: "Adventure",
    desc: "9 Consonants, 4 Vowels. Practice your Spellsword abilities in a good balance of difficulty and fun!",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 4v5l-9 7l-4 4l-3-3l4-4l7-9zM6.5 11.5l6 6"/></svg>`,
  },
  {
    name: "Master",
    desc: "6 Consonants, 2 Vowels. Not for the faint of heart!",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="currentColor" d="m19.05 21.6l-2.925-2.9l-2.2 2.2l-.7-.7q-.575-.575-.575-1.425t.575-1.425l4.225-4.225q.575-.575 1.425-.575t1.425.575l.7.7l-2.2 2.2l2.9 2.925q.3.3.3.7t-.3.7l-1.25 1.25q-.3.3-.7.3t-.7-.3ZM22 5.9L10.65 17.25l.125.1q.575.575.575 1.425t-.575 1.425l-.7.7l-2.2-2.2l-2.925 2.9q-.3.3-.7.3t-.7-.3L2.3 20.35q-.3-.3-.3-.7t.3-.7l2.9-2.925l-2.2-2.2l.7-.7q.575-.575 1.425-.575t1.425.575l.1.125L18 1.9h4v4ZM8.35 9.425l.6-.575l.575-.6l-.575.6l-.6.575Zm-1.4 1.425L2 5.9v-4h4l4.95 4.95l-1.425 1.4l-4.35-4.35H4v1.175l4.35 4.35l-1.4 1.425Zm2.3 4.975L20 5.075V3.9h-1.175L8.075 14.65l1.175 1.175Zm0 0l-.6-.575l-.575-.6l.575.6l.6.575Z"/></svg>`,
  },
  {
    name: "Computer",
    desc: "Challenge an AI bot! Can you beat the computer?",
    icon: `        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 22v-4.25q-.975-.425-1.713-1.137T3.037 15q-.512-.9-.775-1.925T2 11q0-3.95 2.8-6.475T12 2q4.4 0 7.2 2.525T22 11q0 1.05-.263 2.075T20.963 15q-.513.9-1.25 1.613T18 17.75V22H6Zm2-2h1v-2h2v2h2v-2h2v2h1v-3.55q.95-.225 1.688-.75t1.25-1.25q.512-.725.787-1.6T20 11q0-3.125-2.212-5.063T12 4Q8.425 4 6.212 5.938T4 11q0 .975.275 1.85t.788 1.6q.512.725 1.262 1.25T8 16.45V20Zm2.5-5h3L12 12l-1.5 3Zm-2-2q.825 0 1.413-.588T10.5 11q0-.825-.588-1.413T8.5 9q-.825 0-1.413.588T6.5 11q0 .825.588 1.413T8.5 13Zm7 0q.825 0 1.413-.588T17.5 11q0-.825-.588-1.413T15.5 9q-.825 0-1.413.588T13.5 11q0 .825.588 1.413T15.5 13ZM12 20Z"
          />
        </svg>`,
  },
];
</script>
