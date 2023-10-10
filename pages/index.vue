<template>
  <Hero />
  <Download />
  <DownloadToPlatformsDivider />
  <Platforms />
  <PlatformsToAboutDivider />
  <About />
</template>

<script setup>
definePageMeta({ layout: "base", middleware: "auth" });
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.index);
});
</script>
