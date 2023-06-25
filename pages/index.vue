<template>
  <Hero />
  <HeroToDownloadDivider />
  <Download />
  <DownloadToAboutDivider />
  <div class="h-screen"></div>
</template>

<script setup>
definePageMeta({ layout: "index" });
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.index);
});
</script>
