<template>
  <button
    class="btn disabled:cursor-not-allowed"
    :class="`btn-${type}`"
    @click="($event) => handleClick($event)"
    :disabled="loading || disabled"
  >
    <ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" v-if="loading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import buttonClick from "../assets/button_click.mp3";
import { Howl } from "howler";
const sound = new Howl({
  src: [buttonClick],
});
const props = defineProps<{
  type?: "primary" | "secondary" | "info";
  loading?: boolean;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "click", id: Event): void;
}>();

function handleClick(e) {
  sound.play();
  emits("click", e);
}
</script>
