<template>
  <button
    class="disabled:cursor-not-allowed disabled:grayscale uppercase tracking-wider font-semibold border-2 transition ease-in-out p-2 rounded-md hover:shadow-md"
    :class="
      fill
        ? type === 'primary'
          ? 'bg-[#4ab5cd] text-black border-[#4ab5cd] hover:bg-opacity-80'
          : type === 'secondary'
          ? 'bg-secondary text-primary border-secondary hover:bg-opacity-80'
          : 'bg-accent text-primary border-accent hover:bg-opacity-80'
        : type === 'primary'
        ? 'border-[#4ab5cd] text-[#4ab5cd] hover:bg-[#4ab5cd] hover:text-white hover:shadow-md'
        : type === 'secondary'
        ? 'border-secondary text-secondary hover:bg-secondary hover:text-primary hover:shadow-md'
        : 'border-accent text-accent hover:bg-accent hover:text-primary hover:shadow-md'
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
  fill?: boolean;
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
