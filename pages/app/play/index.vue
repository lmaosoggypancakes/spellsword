<template>
  <div
    class="h-full w-full sm:px-8 lg:px-32 py-32 grid grid-cols-3 grid-flow-row col-auto gap-8 text-seasalt"
  >
    <!-- <PlayButton primary class="outline-red-400 bg-red-400" :disabled="disabled">
      Play a friend
    </PlayButton> -->
    <PlayButton
      primary
      class="bg-blue-200 outline-blue-200"
      :disabled="disabled"
      @click="matchmake()"
    >
      Matchmake
    </PlayButton>
    <PlayButton class="bg-green-300 outline-green-300" :disabled="disabled">
      Play Computer
    </PlayButton>
    <!-- <PlayButton
      primary
      class="bg-yellow-200 outline-yellow-200"
      :disabled="disabled"
    ></PlayButton> -->
  </div>
  <MatchmakingToast v-if="status.matchmaking" />
  <ConnectingToast v-if="status.connecting" />
  <ErrorToast v-if="status.error" />
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import PlayButton from "@/components/app/play/playButton.vue";
import MatchmakingToast from "@/components/toasts/matchmaking.vue";
import ConnectingToast from "@/components/toasts/connecting.vue";
import ErrorToast from "@/components/toasts/error.vue";

definePageMeta({
  layout: "app",
  middleware: "auth",
});

const config = useRuntimeConfig();
const router = useRouter();
const auth = useAuth();
const status = reactive({
  matchmaking: false,
  connecting: false,
  matchFound: false,
  error: false,
});
const disabled = computed(() => Object.values(status).some((a) => !!a));
const matchmake = () => {
  status.connecting = true;
  const socket = io(`${config.public.apiUrl}/matchmake`, {
    auth: {
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
