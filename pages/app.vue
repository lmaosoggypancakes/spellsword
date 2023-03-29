<template>Hello, {{ user.user.username }}</template>
<script setup lang="ts">
const user = useUser();
definePageMeta({
  middleware: ["auth"],
  layout: "app",
});
</script>
