<template>
  <nav
    class="md:h-screen md:border-r-2 border-b-2 md:border-b-0 border-seasalt text-accent flex md:flex-col justify-center font-bold bg-raisin md:col-span-2"
  >
    <li
      v-for="link in navLinks"
      :key="link.name"
      class="inline flex items-center hover:text-tea_green hover:bg-primary py-4 px-2"
    >
      <component :is="link.icon" class="h-8 w-8 md:h-6 md:w-6 mx-4"></component>
      <NuxtLink :href="link.href"
        ><span class="hidden md:inline">{{ link.name }}</span></NuxtLink
      >
    </li>
  </nav>
</template>

<script setup lang="ts">
import { User, AppNavLink } from "~~/types";
import {
  UserCircleIcon,
  MagnifyingGlassCircleIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";

const auth = useAuth();
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
  {
    href: "/app/learn",
    name: "Learn to Play",
    icon: PencilIcon,
  },
]);
const userStore = useUser();
const user: User = userStore.user;
</script>
