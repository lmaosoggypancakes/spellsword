<template>
  <div>
    <label class="block">{{ props.name }}</label>
    <input
      class="block bg-raisin border-b-2 border-secondary focus:p-3 p-2 transition-all outline-none"
      :type="props.type"
      :value="props.modelValue"
      @input="
        $emit('update:modelValue', (<HTMLInputElement>$event.target).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  type: "password" | "text";
  modelValue: string;
}>();
const emits = defineEmits<{
  "update:modelValue": string;
}>();
emits["update:modelValue"];
</script>
