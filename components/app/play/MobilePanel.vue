<template>
  <div
    class="flex flex-col h-screen w-screen items-center fixed top-0 md:hidden"
  >
    <Transition @leave="(el, done) => motion.pop.leave(done)">
      <div
        class="h-[90vh] w-[90vw] bg-secondary backdrop-blur-md mt-[10vh] rounded-2xl"
        ref="panel"
        v-if="visible"
        v-motion="'pop'"
        :initial="{
          y: 1000,
          transition: {
            duration: 100,
          },
          // opacity: 0,
        }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: {
            bounce: 0,
          },
        }"
        :leave="{
          y: 1000,
          // opacity: 0,
          transition: {
            duration: 250,
          },
        }"
      >
        <Icon
          name="material-symbols:close-rounded"
          class="text-primary h-12 w-12 ml-4 mt-4"
          @click="$emit('close')"
        />
      </div>
    </Transition>
  </div>
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
  if (!v && direction.value == "down") {
    emits("close");
  }
});
</script>
