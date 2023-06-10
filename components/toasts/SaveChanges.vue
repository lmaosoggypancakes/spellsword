<template>
  <div
    class="bg-apricot p-4 fixed bottom-2 right-2 rounded-md flex text-primary items-center"
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
    <button
      class="ml-2 bg-space hover:bg-raisin text-white rounded-md py-2 px-6"
      @click="handleClick()"
    >
      <span v-if="!loading">Save</span>
      <ArrowPathIcon class="w-6 h-6 animate-spin" v-else />
    </button>
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
