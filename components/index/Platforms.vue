<template>
  <div
    class="grid lg:grid-cols-2 p-4 justify-around overflow-hidden bg-accent text-primary"
    id="platforms"
  >
    <div class="flex flex-col justify-center" ref="phone">
      <div
        class="mockup-phone transform transition-none ease-in-out"
        :style="`transform: rotateZ(${rotate}deg)`"
      >
        <div class="camera"></div>
        <div class="display">
          <div class="artboard artboard-demo phone-1">
            <img src="/logo.png" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-2xl p-4"
      v-motion="{
        initial: { opacity: 0, x: 30 },
        visibleOnce: {
          opacity: 1,
          x: 0,
          transition: { delay: 500 },
        },
      }"
    >
      <p class="text-5xl my-8 transform">Spellsword goes with you.</p>
      Be it on the fly, at home, or on a laptop. With its cross-platform
      compatibility, this immersive game accompanies you anytime, anywhere,
      enabling you to enhance your English language skills effortlessly. Whether
      you have a few minutes or an extended gaming session, Spellsword ensures a
      seamless experience that
      <span class="underline font-extrabold text-[#111e27]"
        >fits your lifestyle</span
      >
      and
      <span class="underline font-extrabold text-[#111e27]"
        >boosts your English</span
      >
      proficiency on the go.
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
const phone = ref<HTMLElement | null>(null);
const rotate = computed(() => {
  if (!phone.value) return 0;
  return (y.value - phone.value?.offsetTop) / 50;
});
</script>
