<template>
  <div class="px-8 py-8 flex flex-col gap-x-8 relative h-full w-full uppercase">
    <h1 class="text-4xl text-info text-center md:text-right">
      Hello, {{ user.username }}
    </h1>
    <div class="divider"></div>
    <div class="flex justify-center my-auto">
      <LeftUserStatistics />
      <RankImage rank="diamond" />
      <RightUserStatistics />
    </div>
    <div class="flex flex-col w-2/3 mx-auto">
      <span class="text-2xl flex justify-between mb-2">
        <span class="inline float-left">progress</span>
        <span class="inline float-right">3456/10345 SP</span>
      </span>
      <progress
        class="progress progress-info shadow-md shadow-info"
        value="50"
        max="100"
      ></progress>
    </div>
    <LazyMatchmakingForm />
  </div>
  <LazyPlayModeModal primary :disabled="disabled" />
  <Matchmaking v-if="status.matchmaking" />
  <LazyConnecting v-if="status.connecting" />
  <LazyError v-if="status.error" />
  <LazyMatchFound v-if="status.matchFound" />
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
const matchmaker = useMatchmaker();
const auth = useAuth();
const user = useUser();
const status = reactive({
  matchmaking: false,
  connecting: false,
  matchFound: false,
  error: false,
});
const disabled = computed(() => Object.values(status).some((a) => !!a));

matchmaker.$subscribe((_, matchmaker) => {
  console.log(matchmaker);
  if (matchmaker.ready && matchmaker.type) {
    matchmake(matchmaker.type);
  }
  matchmaker.ready = false;
});
const matchmake = async (difficulty: Difficulty) => {
  setDiscordActivity(Activity.matchmaking);
  status.connecting = true;
  matchmaker.matchmaking = true;

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
    console.log(id);
    matchFoundSound.play();
    status.matchmaking = false;
    status.matchFound = true;
    setTimeout(() => {
      if (id) {
        matchmaker.matchmaking = false;
        router.push(`/app/play/${id}`);
      }
    }, 2000);
  });
};
</script>
