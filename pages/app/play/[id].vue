<template>{{ data }}</template>

<script setup lang="ts">
definePageMeta({
  layout: "app",
  middleware: ["auth"],
});
const route = useRoute();
const config = useRuntimeConfig();
const data = await useFetch(
  `${config.public.apiUrl}/api/games/${route.params.id}`
);
</script>
