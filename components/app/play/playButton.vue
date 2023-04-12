<template>
  <button
    class="outline outline-offset-2 rounded-md bg-opacity-30 flex items-center justify-center disabled:cursor-not-allowed"
    :class="{
      'col-span-2': primary,
      grayscale: disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  primary?: boolean; // takes up 3 cols instead of 1
  disabled?: boolean;
}>();
</script>
