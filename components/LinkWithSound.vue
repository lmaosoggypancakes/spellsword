<template>
  <NuxtLink @click="handleClick" :href="props.href" :class="class">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import buttonClick from "~/assets/button_click.mp3";
import { Howl } from "howler";
const props = defineProps<{
  href: string;
  class: string;
}>();

const emits = defineEmits<{
  (e: "click", id: Event): void;
}>();

function handleClick(e) {
  const sound = new Howl({
    src: [buttonClick],
  });
  sound.play();
  emits("click", e);
}
</script>
