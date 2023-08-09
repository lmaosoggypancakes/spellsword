<template>
  <img
    src="@/assets/ranks/radiant.png"
    class="rounded-full h-96 w-96 shadow-md shadow-info"
    ref="rank"
  />
</template>

<script setup lang="ts">
import { useSpring } from "@vueuse/motion";
const rank = ref<HTMLElement>();

// const props = defineProps<{
//   rank: "silver" | "gold" | "radiant" | "diamond";
// }>();
// const getImageUrl = () => {
//   const url = new URL(`/assets/ranks/${props.rank}.png`, import.meta.url);
//   return url;
// };
const { variant } = useMotion(rank, {
  initial: { opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      onComplete: () => {
        try {
          variant.value = "levitate";
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
  levitate: {
    y: 15,
    transition: {
      duration: 2000,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror",
    },
  },
});
</script>
