<template>
  <p class="block brand text-center" :class="small ? 'text-3xl' : 'text-8xl'">
    <span class="text-[#4ab5cd] text-shadow-lg shadow-[#4ab5cd]">Spell</span
    ><span class="text-[#e8746a] text-shadow-lg shadow-[#e8746a]">sword</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  small?: true;
}>();
</script>
<style>
@font-face {
  font-family: "Roxborough CF";
  src: url("@/assets/fonts/RoxboroughCF.ttf");
}
.brand {
  font-family: "Roxborough CF";
}
</style>
