<template>
  <div
    class="bg-red-300 p-4 fixed bottom-2 right-2 rounded-md flex text-primary"
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
    <p>An error occured. Please try again later.</p>
    <slot />
  </div>
</template>
