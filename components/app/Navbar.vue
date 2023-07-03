<template>
  <nav
    class="hidden md:flex md:h-screen md:border-r-2 border-b-2 md:border-b-0 border-accent text-accent md:flex-col justify-center font-bold md:col-span-2 overflow-hidden"
  >
    <LinkWithSound
      v-for="link in navLinks"
      :href="link.href"
      :key="link.name"
      active-class="bg-primary"
      class="flex items-center hover:bg-primary py-4 px-2"
    >
      <component :is="link.icon" class="h-8 w-8 md:h-6 md:w-6 mx-4"></component>
      <span class="hidden md:inline">{{ link.name }}</span>
    </LinkWithSound>
  </nav>
  <div class="btm-nav mt-5 md:hidden z-[10]">
    <LinkWithSound
      v-for="link in navLinks"
      :href="link.href"
      :key="link.name"
      active-class="active"
      class="flex items-center hover:bg-primary text-accent"
    >
      <component :is="link.icon" class="h-8 w-8 md:h-6 md:w-6 mx-4"></component>
      <span class="hidden md:inline">{{ link.name }}</span>
    </LinkWithSound>
  </div>
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
    href: "/app/learn/basics",
    name: "Learn to Play",
    icon: PencilIcon,
  },
]);
</script>
