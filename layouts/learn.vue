<template>
  <App>
    <article
      class="py-16 px-48 prose prose-invert lg:prose-lg max-w-none h-screen overflow-auto"
    >
      <!-- the `prose prose-invert` classes are provided by tailwind to provide good, semantic styles on common elements like p, h1, span, aside, blockquote, code, etc -->
      <slot />
    </article>
  </App>
</template>

<script setup lang="ts">
import App from "./app.vue";
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.docs);
});
</script>
