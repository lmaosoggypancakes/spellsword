<template>
  <div v-for="(avatar, index) in avatarUrls">
    <img
      :src="avatar"
      class="p-1 lg:w-44 lg:h-44 w-24 h-24 rounded-xl border-2 border-primary hover:border-secondary place"
      alt="Selected Avatar"
      :class="{
        'border-secondary': modelValue == avatar,
      }"
      @click="$emit('update:modelValue', avatar)"
      v-show="loadedImages[index]"
      @load="loadedImages[index] = true"
    />
    <div v-show="!loadedImages[index]" class="animate-ping">
      <div class="rounded-full bg-slate-700 h-8 w-8"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const props = defineProps<{ modelValue: string }>();
const loadedImages = ref(Array(16).fill(false));
const avatarUrls = Array(16)
  .fill(0)
  .map(
    (x, i) =>
      `https://spellsword.up.railway.app/static/images/avatars/${i + 1}.png`
  );
</script>
