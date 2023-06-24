<template>
  <div
    class="bg-accent p-4 fixed bottom-2 right-2 rounded-md flex text-primary items-center"
    v-motion="{
      initial: {
        y: 100,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
      },
    }"
  >
    <span> Careful - you have unsaved changes! </span>
    <Button
      class="ml-2 bg-base-100 hover:px-8 hover:py-4 text-white rounded-md py-2 px-6 transition-all"
      @click="handleClick()"
    >
      <span v-if="!loading">Save</span>
      <ArrowPathIcon class="w-6 h-6 animate-spin" v-else />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
const props = defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(["click"]);
const handleClick = () => {
  // prevent user from saving multiple times
  if (!props.loading) {
    emits("click");
  }
};
</script>
