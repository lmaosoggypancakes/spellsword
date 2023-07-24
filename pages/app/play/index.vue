<template>
  <div
    class="w-full px-8 py-8 md:py-32 text grid lg:grid-cols-2 lg:grid-flow-col gap-x-8 relative h-full"
  >
    <PlayModeModal
      primary
      :disabled="disabled"
      @matchmake="matchmake"
      class="col-span-1"
    />

    <img class="rounded-full w-64 h-64" src="@/assets/ranks/radiant.png" />
    <form
      class="absolute bottom-0 flex justify-center px-32 py-16 w-full space-x-8"
      @submit.prevent=""
    >
      <label
        class="p-2 rounded-md border-2 text-info border-info hover:bg-info hover:text-primary transition cursor-pointer grow shadow-sm shadow-info inline-flex items-center justify-between"
        @click="matchmaker.toggleOpen()"
        for="play_mode_modal"
      >
        <span class="text-lg uppercase p-1">{{
          matchmaker.type || "choose difficulty"
        }}</span>
        <Icon
          name="ic:twotone-keyboard-arrow-up"
          class="h-8 w-8 p-0 float-right"
        />
      </label>
      <Button>Matchmake</Button>
    </form>
  </div>
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

const matchmaker = useMatchmaker();
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
  // setDiscordActivity(Activity.matchmaking);
  // status.connecting = true;
  // const socket = io(`${config.public.apiUrl}/matchmake`, {
  //   auth: {
  //     difficulty,
  //     token: auth.token,
  //   },
  // });
  // socket.on("error", (error) => {
  //   alert(error);
  //   status.matchmaking = false;
  //   status.connecting = false;
  //   status.error = true;
  //   socket.disconnect();
  // });
  // socket.on("welcome", ({ message }, ...args) => {
  //   status.connecting = false;
  //   status.matchmaking = true;
  // });
  // socket.on("match", ({ id }) => {
  //   matchFoundSound.play();
  //   setTimeout(() => {
  //     if (id) {
  //       router.push(`/app/play/${id}`);
  //     }
  //   }, 2000);
  // });
};
</script>
