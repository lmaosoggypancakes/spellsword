<template>
  <p
    class="block brand text-center"
    :class="small ? 'text-3xl' : 'lg:text-8xl text-6xl'"
  >
    <span class="text-[#4ab5cd] text-shadow-sm shadow-[#4ab5cd]">Spell</span
    ><span class="text-[#e8746a] text-shadow-sm shadow-[#e8746a]">sword</span>
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
