<template>
  <button
    class="btn"
    :class="`btn-${type}`"
    @click="($event) => handleClick($event)"
    :disabled="props.loading"
  >
    <ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" v-if="props.loading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import buttonClick from "../assets/button_click.mp3";
import { Howl } from "howler";
const props = defineProps<{
  type?: "primary" | "secondary" | "info";
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "click", id: Event): void;
}>();

function handleClick(e) {
  console.log(buttonClick);
  const sound = new Howl({
    src: [buttonClick],
  });
  sound.play();
  setTimeout(() => {
    emits("click", e);
  }, 2000);
}
</script>
