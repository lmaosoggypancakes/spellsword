<template>
  <App>
    <article
      class="py-16 px-48 prose prose-invert lg:prose-lg max-w-none h-screen overflow-auto"
    >
      <slot />
    </article>
  </App>
</template>

<script setup lang="ts">
import App from "/layouts/app.vue";
</script>
