<template>
  <div class="h-screen w-screen flex flex-col max-h-screen">
    <div class="grow grid grid-cols-7 h-full max-h-screen overflow-y-auto">
      <div
        class="col-span-3 p-8 flex items-center flex-col space-y-4"
        :class="{
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]': isMyTurn,
        }"
      >
        <span class="text-4xl block text-seasalt">{{
          userStore.username
        }}</span>
        <Avatar :src="userStore.picture" />
        <ul class="space-x-4 my-4">
          <LetterBlock
            v-for="letter in queue"
            :letter="letter"
            @toggle="toggleLetter"
            :id="letter.id"
          />
        </ul>
      </div>
      <div class="border-x-2 border-secondary overflow-y-auto">
        <ul>
          <MoveCard
            :move="move"
            v-for="move in moves"
            :opponent="move.userId !== userStore.user.id"
          />
        </ul>
      </div>
      <div
        class="col-span-3 p-8 flex items-center flex-col space-y-4"
        :class="{
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]': !isMyTurn,
        }"
      >
        <span class="text-4xl text-center block text-seasalt">{{
          opponent?.username
        }}</span>
        <Avatar :src="opponent?.picture || ''" />
      </div>
    </div>
    <div class="w-full flex justify-center mt-auto border-t-2 border-secondary">
      <ul class="space-x-4 my-4">
        <LetterBlock
          v-for="letter in letters"
          :letter="letter"
          @toggle="toggleLetter"
          :id="letter.id"
        />
      </ul>
    </div>
  </div>
  <WaitingToast v-if="status == GameConnectionStatus.WAITING" />
  <ConnectingToast v-if="status == GameConnectionStatus.CONNECTING" />
</template>

<script setup lang="ts">
import Avatar from "@/components/app/play/avatar.vue";
import LetterBlock from "@/components/app/play/letterBlock.vue";
import MoveCard from "@/components/app/play/moveCard.vue";
import { Letter, Move } from "@/types";
import { Game, GameConnectionStatus } from "@/types";
import { io, Socket } from "socket.io-client";
import ConnectingToast from "@/components/toasts/connecting.vue";
import WaitingToast from "@/components/toasts/waiting.vue";

const auth = useAuth();
const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUser();
const isMyTurn = ref(false);
const gameReq = await useFetch(
  `${config.public.apiUrl}/api/games/${route.params.id}`
);
const gameMetadata = reactive<Game>(<Game>gameReq.data.value);
const opponent = gameMetadata.players.find(
  (user) => user.username != userStore.username
);
definePageMeta({
  layout: "lobby",
  middleware: ["auth"],
  scrollToTop: true,
});
const status = ref<GameConnectionStatus>(GameConnectionStatus.CONNECTING);
let socket: Socket;
onMounted(() => {
  socket = io(`${config.public.apiUrl}/play`, {
    transports: ["websocket"],
    autoConnect: false,
    query: {
      id: route.params.id,
    },
    auth: {
      id: route.params.id,
      token: auth.token,
    },
  });
  socket.on("connect", console.log);
  socket.on("welcome", console.log);
  socket.on("player-joined", console.log);
  socket.on("ready", () => {
    status.value = GameConnectionStatus.CONNECTED;
  });
  socket.on("new-move", ({ data }) => {
    if ((data as Move).userId !== userStore.id) {
      // latest move is from opponent, and so it's our turn
      isMyTurn.value = true;
    } else {
      isMyTurn.value = false;
    }
    moves.value.push(data);
  });
  socket.on("your-turn", () => {
    isMyTurn.value = true;
  });
  status.value = GameConnectionStatus.WAITING;
});
const letters = reactive<Letter[]>(convertSequence(gameMetadata.characters));
const sequence = letters
  .map((letter) => letter.value)
  .join("")
  .toLowerCase();
const queue = reactive<Letter[]>([]);
const moves = ref<Move[]>([]);

useKeydownEvent((event) => {
  if (event.key == "Backspace") {
    popFromQueue();
  }
  if (event.key == "Enter") {
    appendMove();
  }
  if (sequence.includes(event.key.toLowerCase())) {
    const possibleLetter = letters.find(
      (letter) =>
        !letter.active && letter.value.toLowerCase() == event.key.toLowerCase()
    );
    if (possibleLetter) {
      toggleLetter(possibleLetter, true);
    }
  }
});

const toggleLetter = (letter: Letter, active = false) => {
  if (letter.active || active) {
    // if the letter is active (in queue), remove it from the queue
    // activate corresponding letter in the global letters
    const l = letters.find((l) => l.id == letter.id);
    if (l) {
      // set the letter as clickable again
      l.active = false;
    }
    // queue.splice(queue.indexOf(letter), 1);
  }
  if (!letter.active) {
    queue.push({ ...letter, active: true });
  }
  letter.active = !letter.active;
};

const popFromQueue = () => {
  const lastLetter = queue.pop();
  // assumes lastLetter.active is true
  if (!lastLetter) return;
  toggleLetter(lastLetter);
};

const appendMove = async (data: Move | undefined = undefined) => {
  if (data) {
    moves.value.push(data);
    return;
  }
  const move = await getMove();
  if (move) {
    socket.emit("moves", move);
    return;
  }
};
const getMove = async (): Promise<Move | null> => {
  if (queue.length == 0) return null;
  const guess = queue.map((l) => l.value).join("");
  if (moves.value.map((move) => move.guess).includes(guess)) return null;
  const word = await verifyWord(guess);
  const valid = !!word;
  const points = valid ? getPoints(guess) : 0;
  resetLetters();
  if (!valid) {
    return {
      gameId: gameMetadata.id,
      guess,
      points,
      valid,
      userId: userStore.user.id,
    };
  } else {
    return {
      gameId: gameMetadata.id,
      guess,
      points,
      valid,
      userId: userStore.user.id,
      definition: word.definition,
    };
  }
};

const resetLetters = () => {
  for (const letter of queue) {
    if (letter.active) {
      const l = letters.find((l) => l.id == letter.id);
      if (l) {
        l.active = false;
      }
      letter.active = false;
    }
  }
  queue.length = 0;
};
</script>
