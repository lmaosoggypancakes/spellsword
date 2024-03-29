<template>
  <div
    id="hero"
    class="min-h-screen flex flex-col justify-between pt-2"
    :style="`--zoom: ${zoom}%`"
  >
    <LandingNavbar class="bg-transparent" v-motion-fade />
    <div
      class="grid lg:grid-cols-2 place-items-center justify-center z-10 h-screen w-4/5 md:w-full place-self-center"
      v-motion-fade
    >
      <img
        src="/logo_transparent.png"
        class="w-4/5 md:h-1/2 md:w-1/2 hover:shadow-2xl transition-all"
        ref="image"
        :style="{
          transform: `rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg)`,
        }"
        @mousemove="(e) => rotate(e)"
        @mouseleave="resetRotate"
      />
      <div class="flex flex-col justify-center space-y-16">
        <div>
          <BrandLettering />
          <p class="w-full lg:max-w-lg max-w-sm mx-auto mt-4 text-center">
            An interactive word-based game designed to improve our command of
            the English language.
          </p>
        </div>
        <NuxtLink
          :href="`/download/${os ? os[0].toLowerCase() : ''}`"
          class="w-full"
        >
          <Button
            type="accent"
            class="flex items-center justify-center space-x-4 w-full"
            ><span>Download for {{ os ? os[0] : "" }}</span>
            <Icon :name="os ? os[1] : ''" class="place-self-center h-6 w-6"
          /></Button>
        </NuxtLink>
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
  opacity: 50%;
}
</style>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { OperatingSystem } from "types";

const rotateX = ref(0);
const rotateY = ref(0);
const rotateZ = ref(0);
const os = ref<[OperatingSystem, string] | null>(null);
const scroll = useWindowScroll();

const rotate = (e: MouseEvent) => {
  rotateZ.value = -45 * Math.sin((Math.PI * 10) / e.offsetY);
  rotateX.value = -45 * Math.sin((Math.PI * 20) / e.offsetX);
};
const resetRotate = () => {
  rotateX.value = rotateY.value = rotateZ.value = 0;
};
onMounted(() => {
  os.value = getOperatingSystem();
});

// setInterval(() => {
//   rotateZ.value++;
//   rotateX.value++;
// });
const zoom = computed(() => {
  return Math.round(scroll.y.value / 5);
});
</script>
