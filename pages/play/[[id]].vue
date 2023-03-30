<template>{{ route.params.id ?? "Index" }}</template>

<script setup lang="ts">
const route = useRoute();
</script>
