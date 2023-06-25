<template>
  <div
    class="toast toast-end max-w-xs shadow-lg backdrop-blur-sm text-sm"
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
    <slot />
  </div>
</template>
