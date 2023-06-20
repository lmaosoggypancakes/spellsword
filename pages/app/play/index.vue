<template>
  <div
    class="w-full px-8 py-32 text grid lg:grid-cols-2 lg:grid-flow-col gap-x-8"
  >
    <PlayModePanel
      primary
      :disabled="disabled"
      @matchmake="matchmake"
      class="col-span-1"
    />
    <nuxt-img
      :src="user.picture"
      class="hidden xl:block place-self-center mask mask-squircle"
      height="512"
      width="512"
    />
  </div>
  <Matchmaking v-if="status.matchmaking" />
  <Connecting v-if="status.connecting" />
  <Error v-if="status.error" />
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { Activity, Difficulty } from "~/types";

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
    if (id) {
      router.push(`/app/play/${id}`);
    }
  });
};
</script>
