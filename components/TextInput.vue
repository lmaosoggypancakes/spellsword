<template>
  <div>
    <label class="block" v-if="!placeholder">{{ props.name }}</label>
    <input
      class="input input-bordered input-secondary w-full max-w-xs focus:p-6 transition-all"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="placeholder || ''"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import buttonClick from "~/assets/button_click.mp3";
import { Howl } from "howler";
const props = defineProps<{
  name?: string;
  type: "password" | "text";
  modelValue: string;
  placeholder?: string;
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
