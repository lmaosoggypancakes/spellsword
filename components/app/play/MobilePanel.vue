<template>
  <Transition @leave="(el, done) => motion.pop.leave(done)">
    <div
      class="h-screen w-screen fixed top-0 bg-secondary backdrop-blur-md"
      ref="panel"
      v-if="visible"
      v-motion="'pop'"
      :initial="{
        x: 1000,
        transition: {
          duration: 100,
        },
        // opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          bounce: 0,
        },
      }"
      :leave="{
        x: 1000,
        // opacity: 0,
        transition: {
          duration: 100,
        },
      }"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import { useSwipe } from "@vueuse/core";
import { useMotions } from "@vueuse/motion";

defineProps<{ visible: boolean }>();
const panel = ref(null);
const { isSwiping, direction } = useSwipe(panel);
const motion = useMotions();
const emits = defineEmits<{
  (e: "close"): void;
}>();
watch(isSwiping, (v) => {
  if (!v && direction.value == "right") {
    emits("close");
  }
});
</script>
