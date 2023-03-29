<template>
  <Popover>
    <PopoverButton
      class="border-2 border-secondary rounded-md text-center py-2 px-4 border-2 border-secondary"
      >{{ props.title }}</PopoverButton
    >
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10">
        <slot />
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const props = defineProps<{ title: string }>();
</script>
