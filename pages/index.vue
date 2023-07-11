<template>
  <Hero />
  <HeroToDownloadDivider />
  <Download />
  <Platforms />
  <PlatformsToAboutDivider />
  <About />
</template>

<script setup>
definePageMeta({ layout: "index", middleware: "auth" });
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.index);
});
</script>
