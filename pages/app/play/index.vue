<template>
  <div
    class="h-full w-full sm:px-8 lg:px-32 py-32 grid grid-cols-3 grid-flow-row col-auto gap-8 text-seasalt"
  >
    <div
      class="col-span-2 outline outline-offset-2 outline-red-400 rounded-md bg-red-400 bg-opacity-30 flex items-center justify-center"
    >
      Play a friend
    </div>
    <div
      class="bg-blue-200 outline outline-offset-2 outline-blue-200 rounded-md bg-opacity-30 flex items-center justify-center"
    >
      Find Random Player
    </div>
    <div
      class="bg-green-300 outline outline-offset-2 outline-green-300 rounded-md bg-opacity-30 flex items-center justify-center"
    >
      Play Computer
    </div>
    <div
      class="bg-yellow-200 outline outline-offset-2 outline-yellow-200 rounded-md bg-opacity-30 flex items-center justify-center col-span-2"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
  middleware: "auth",
});
</script>
