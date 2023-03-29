<template>
  <button
    class="border-2 border-secondary rounded-md text-center py-2 px-4 border-2 border-secondary disabled:cursor-not-allowed"
    :class="{
      'bg-secondary text-primary hover:bg-tea_green': props.type == 'primary',
    }"
    @click="($event) => emits('click', $event)"
    :disabled="props.loading"
  >
    <ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" v-if="props.loading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
const props = defineProps<{
  type: "primary" | "secondary";
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: "click", id: Event): void;
}>();
</script>
