<template>
  <nav
    class="h-screen md:w-1/6 h-1/6 md:h-full md:border-r-2 border-b-2 md:border-b-0 border-seasalt text-accent flex md:flex-col justify-center font-bold bg-raisin"
  >
    <li
      v-for="link in navLinks"
      :key="link.name"
      class="inline flex items-center hover:text-tea_green hover:bg-primary py-4 px-2"
    >
      <component :is="link.icon" class="h-6 w-6 mx-4"></component>
      <NuxtLink :href="link.href">{{ link.name }}</NuxtLink>
    </li>
  </nav>
</template>

<script setup lang="ts">
import { User, AppNavLink } from "~~/types";
import {
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/vue/24/outline";
const navLinks = ref<AppNavLink[]>([
  {
    href: "/app/account",
    name: "Account",
    icon: UserCircleIcon,
  },
  {
    href: "/app/play",
    name: "Find Match",
    icon: MagnifyingGlassCircleIcon,
  },
]);
const userStore = useUser();
const user: User = userStore.user;
</script>
