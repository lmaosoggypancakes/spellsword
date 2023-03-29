<template>
  <button
    class="border-2 border-secondary rounded-md text-center py-2 px-4 border-2 border-secondary"
    :class="{
      'bg-secondary text-primary hover:bg-tea_green': props.type == 'primary',
    }"
    @click="($event) => emits('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: "primary" | "secondary";
}>();

const emits = defineEmits<{
  (e: "click", id: Event): void;
}>();
</script>
