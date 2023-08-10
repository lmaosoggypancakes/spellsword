<template>
  <div class="flex flex-col items-center justify-center h-full">
    <Icon
      name="lucide:swords"
      class="h-24 w-24 animate-spin-slow loader shadow-inset-accent rounded-2xl p-1"
    />
  </div>
</template>

<style>
.loader path {
  stroke-dasharray: 50;
  stroke-dashoffset: 200;
  animation: draw 3s ease-in alternate;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  /* infinite repeat */
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
