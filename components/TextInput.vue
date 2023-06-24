<template>
  <div>
    <label class="block">{{ props.name }}</label>
    <input
      class="block bg-neutral border-b-2 border-secondary focus:p-3 p-2 rounded-md transition-all outline-none"
      :type="props.type"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import buttonClick from "~/assets/button_click.mp3";
import { Howl } from "howler";
const props = defineProps<{
  name: string;
  type: "password" | "text";
  modelValue: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const handleInput = (e) => {
  const sound = new Howl({
    src: [buttonClick],
  });
  sound.play();
  emits("update:modelValue", e.target.value);
};
</script>
