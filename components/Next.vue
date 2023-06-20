<template>
  <NuxtLink
    class="border-2 border-accent bg-accent text-primary hover:bg-opacity-90 inline w-64 rounded-md underline-none p-2"
    :href="href"
  >
    <div class="flex flex-col w-fit float-left">
      <span class="text-sm">Next</span>
      <span class="text-xl"><slot /></span>
    </div>
    <ArrowRightIcon class="h-6 w-6 float-right" />
  </NuxtLink>
</template>
<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
const props = defineProps<{
  href: string;
}>();
</script>
