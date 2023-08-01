<template>
  <div class="px-8 py-8 flex flex-col gap-x-8 relative h-full w-full">
    <h1 class="text-4xl text-info uppercase text-right">
      Hello, {{ user.username }}
    </h1>
    <div class="divider"></div>
    <div class="flex justify-center my-auto">
      <LeftUserStatistics />
      <RankImage rank="diamond" />
      <RightUserStatistics />
    </div>
    <MatchmakingForm />
  </div>
  <PlayModeModal primary :disabled="disabled" @matchmake="matchmake" />
  <Matchmaking v-if="status.matchmaking" />
  <Connecting v-if="status.connecting" />
  <Error v-if="status.error" />
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { Activity, Difficulty } from "~/types";
import matchFoundTone from "~/assets/match_found_tone.mp3";
import { Howl } from "howler";

const matchFoundSound = new Howl({
  src: [matchFoundTone],
});
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const config = useRuntimeConfig();
const router = useRouter();
const auth = useAuth();
const user = useUser();
const status = reactive({
  matchmaking: false,
  connecting: false,
  matchFound: false,
  error: false,
});
const disabled = computed(() => Object.values(status).some((a) => !!a));
const matchmake = async (difficulty: Difficulty) => {
  setDiscordActivity(Activity.matchmaking);
  status.connecting = true;
  const socket = io(`${config.public.apiUrl}/matchmake`, {
    auth: {
      difficulty,
      token: auth.token,
    },
  });
  socket.on("error", (error) => {
    alert(error);
    status.matchmaking = false;
    status.connecting = false;
    status.error = true;
    socket.disconnect();
  });
  socket.on("welcome", ({ message }, ...args) => {
    status.connecting = false;
    status.matchmaking = true;
  });
  socket.on("match", ({ id }) => {
    matchFoundSound.play();
    setTimeout(() => {
      if (id) {
        router.push(`/app/play/${id}`);
      }
    }, 2000);
  });
};
</script>
