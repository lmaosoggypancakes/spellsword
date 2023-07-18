<template>
  <div
    id="hero"
    class="min-h-screen flex flex-col justify-between pt-2"
    :style="`--zoom: ${zoom}%`"
  >
    <LandingNavbar class="bg-transparent" v-motion-fade />
    <div
      class="grid lg:rid-cols-2 place-items-center justify-center z-10 h-screen"
      v-motion-fade
    >
      <img src="/logo_transparent.png" class="h-96 w-96" />
      <div class="flex flex-col justify-center space-y-32">
        <div>
          <BrandLettering />
          <p class="w-full max-w-lg mt-4 text-center">
            An interactive word-based game designed to improve our command of
            the English language.
          </p>
        </div>
        <Button type="accent">Play Now</Button>
      </div>
    </div>
    <HeroToDownloadDivider />
  </div>
</template>

<style>
#hero {
  position: relative;
}
#hero::after {
  content: "";
  background-image: url("/banner.png");
  background-attachment: fixed;
  background-position: 0 var(--zoom);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  opacity: 40%;
}
</style>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

const scroll = useWindowScroll();

const zoom = computed(() => {
  return Math.round(scroll.y.value / 5);
});
</script>
