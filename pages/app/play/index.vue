<template>
  <div
    class="h-full w-full sm:px-8 lg:px-32 py-32 text-seasalt overflow-x-scroll"
  >
    <!-- <PlayButton primary class="outline-red-400 bg-red-400" :disabled="disabled">
      Play a friend
    </PlayButton> -->
    <PlayModePanel primary :disabled="disabled" @matchmake="matchmake">
      <MagnifyingGlassIcon class="w-16 h-16" />
      <span class="text-3xl mt-8">Find Match</span>
    </PlayModePanel>
    <!-- <PlayButton class="bg-green-300 outline-green-300" :disabled="disabled">
      Play Computer
    </PlayButton> -->
    <!-- <PlayButton
      secondary
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
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import MatchmakingToast from "@/components/toasts/matchmaking.vue";
import ConnectingToast from "@/components/toasts/connecting.vue";
import ErrorToast from "@/components/toasts/error.vue";
import PlayModePanel from "~/components/app/play/playModePanel.vue";

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
