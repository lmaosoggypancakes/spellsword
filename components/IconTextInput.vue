<template>
  <div class="inline-flex flex-row items-center w-full justify-center">
    <Icon
      :name="name"
      class="h-14 w-14 rounded-tl-md rounded-bl-md bg-secondary text-primary p-4"
    />
    <input
      :type="type"
      :placeholder="placeholder"
      class="h-14 bg-primary border-2 border-secondary rounded-tr-md rounded-br-md outline-none pl-4 w-full"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import buttonClick from "~/assets/button_click.mp3";
import { Howl } from "howler";
const sound = new Howl({
  src: [buttonClick],
});
const props = defineProps<{
  name: string;
  type: "password" | "text";
  modelValue: string;
  placeholder?: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const handleInput = (e) => {
  sound.play();
  emits("update:modelValue", e.target.value);
};
</script>
