<template>
  <div
    class="h-screen bg-space overflow-hidden md:grid grid-flow-row grid-rows-12 md:grid-flow-col md:grid-cols-12"
  >
    <Navbar class="row-span-2" />
    <div class="md:col-span-10 h-screen"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/app/navbar.vue";
</script>
