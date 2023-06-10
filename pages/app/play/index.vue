<template>
  <div
    class="h-screen w-full sm:px-8 lg:px-32 py-32 text-seasalt overflow-y-auto"
  >
    <!-- <PlayButton primary class="outline-red-400 bg-red-400" :disabled="disabled">
      Play a friend
    </PlayButton> -->
    <PlayModePanel primary :disabled="disabled" @matchmake="matchmake">
      <MagnifyingGlassIcon class="w-16 h-16" />
      <span class="text-3xl mt-8">Find Match</span>
    </PlayModePanel>
    <img :src="user.picture" />
    <!-- <PlayButton class="bg-green-300 outline-green-300" :disabled="disabled">
      Play Computer
    </PlayButton> -->
    <!-- <PlayButton
      secondary
      class="bg-yellow-200 outline-yellow-200"
      :disabled="disabled"
    ></PlayButton> -->
  </div>
  <Matchmaking v-if="status.matchmaking" />
  <Connecting v-if="status.connecting" />
  <Error v-if="status.error" />
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
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
const matchmake = (difficulty) => {
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
