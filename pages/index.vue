<template>
  <Hero />
  <ClientOnly>
    <Download />
  </ClientOnly>
  <DownloadToPlatformsDivider />
  <Platforms />
  <PlatformsToAboutDivider />
  <ClientOnly>
    <About />
  </ClientOnly>
</template>

<script setup>
definePageMeta({ layout: "base", middleware: "auth" });
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.index);
});
</script>
