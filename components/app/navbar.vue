<template>
  <nav class="h-screen md:w-1/12 border-r-2 border-seasalt">asdfsaf</nav>
</template>

<script setup lang="ts">
import { User } from "~~/types";

const navLinks = ref<{ name: string; href: string; icon: string }[]>([]);
const userStore = useUser();
const user: User = userStore.user;
</script>
