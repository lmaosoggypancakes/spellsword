<template>
  <button
    class="disabled:cursor-not-allowed uppercase tracking-wider font-semibold border-2 transition p-4 rounded-md"
    :class="
      type === 'primary'
        ? 'border-[#4ab5cd] text-[#4ab5cd] hover:bg-[#4ab5cd] hover:text-white'
        : type === 'secondary'
        ? 'border-secondary text-secondary hover:bg-secondary hover:text-primary'
        : 'border-accent text-accent hover:bg-accent hover:text-primary'
    "
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
