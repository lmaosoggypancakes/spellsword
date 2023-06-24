<template>
  <LinkWithSound
    class="border-2 border-accent bg-accent text-primary hover:bg-opacity-90 inline w-64 rounded-md underline-none p-2 flex-col"
    :href="href"
  >
    <div class="flex flex-col w-fit float-right grow-0">
      <span class="text-sm float-right">Previous</span>
      <span class="text-xl float-right"><slot /></span>
    </div>
    <ArrowLeftIcon class="h-6 w-6 float-left" />
  </LinkWithSound>
</template>
<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
const props = defineProps<{
  href: string;
}>();
</script>
