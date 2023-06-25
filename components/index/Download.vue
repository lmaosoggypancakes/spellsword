<template>
  <div class="min-h-screen bg-accent text-primary">
    <h1
      class="text-7xl text-center"
      v-motion="{
        initial: { opacity: 0, y: -30 },
        visibleOnce: { opacity: 1, y: 0, transition: { delay: 500 } },
      }"
    >
      Downloads
    </h1>
    <span
      class="block text-center text-2xl mt-4"
      v-motion="{
        initial: { opacity: 0, y: -30 },
        visibleOnce: { opacity: 1, y: 0, transition: { delay: 750 } },
      }"
      >One app, many platforms. Play with people across the world.</span
    >
    <DownloadIcons />
  </div>
</template>
