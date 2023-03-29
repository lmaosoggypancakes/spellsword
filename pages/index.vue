<template>
  <Hero />
  <div class="h-screen"></div>
  <div class="h-screen"></div>
</template>

<script setup>
import Hero from "@/components/index/hero";
definePageMeta({ layout: "index", middleware: [] });
</script>
