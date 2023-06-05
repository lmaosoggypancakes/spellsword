<template>
  <div
    class="max-h-screen md:grid grid-flow-row grid-rows-12 md:grid-flow-col md:grid-cols-12 relative min-h-screen grow-0 overflow-y-hidden"
  >
    <Navbar class="row-span-2 sticky left-0 top-0" />
    <div class="md:col-span-10 min-h-screen w-full"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/app/navbar.vue";
</script>
