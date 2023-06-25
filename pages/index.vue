<template>
  <Hero />
  <HeroToDownloadDivider />
  <Download />
  <Platforms />
  <PlatformsToAboutDivider />
  <About />
  <Footer />
</template>

<script setup>
definePageMeta({ layout: "index" });
import { Activity } from "~/types";
onMounted(() => {
  setDiscordActivity(Activity.index);
});
</script>
