<template>
  <img :src="$props.src" class="rounded-2xl w-72 h-72 place-self-center" />
</template>

<script setup lang="ts">
defineProps<{ src: string }>();
</script>
