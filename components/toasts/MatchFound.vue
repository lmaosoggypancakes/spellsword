<template>
  <div
    class="bg-green-300 p-4 fixed bottom-2 right-2 rounded-md flex text-primary"
    v-motion="{
      initial: {
        y: 100,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
      },
    }"
  >
    <p>Match Found! Travelling to arena...</p>
    <slot />
  </div>
</template>
