<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="grow grid grid-cols-7 h-full">
      <div class="col-span-3">
        <ul class="space-x-4 my-4">
          <LetterBlock
            v-for="letter in queue"
            :letter="letter"
            @toggle="toggleLetter"
            :id="letter.id"
          />
        </ul>
      </div>
      <div class="border-x-2 border-secondary">
        <ul>
          <MoveCard
            :move="move"
            v-for="move in moves"
            :opponent="move.user !== userStore.user"
          />
        </ul>
      </div>
      <div class="col-span-3"></div>
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
import LetterBlock from "@/components/app/play/letterBlock.vue";
import MoveCard from "@/components/app/play/moveCard.vue";
import { Letter, Move } from "@/types";
import { Game, GameConnectionStatus } from "@/types";
import { io } from "socket.io-client";
import ConnectingToast from "@/components/toasts/connecting.vue";
import WaitingToast from "@/components/toasts/waiting.vue";

const auth = useAuth();
const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUser();
const gameReq = await useFetch(
  `${config.public.apiUrl}/api/games/${route.params.id}`
);
definePageMeta({
  layout: "lobby",
  middleware: ["auth"],
  scrollToTop: true,
});

useKeydownEvent((event) => {
  if (event.key == "Backspace") {
    popFromQueue();
  }
  if (event.key == "Enter") {
    console.log("adding move");
    addMove();
  }
});

const status = ref<GameConnectionStatus>(GameConnectionStatus.CONNECTING);
let socket;
onMounted(() => {
  console.log(route.params.id);
  socket = io(`${config.public.apiUrl}/play?id=${route.params.id}`, {
    auth: {
      token: auth.token,
    },
  });
  socket.on("welcome", console.log);
  socket.on("player-joined", console.log);
  socket.on("ready", () => {
    console.log("ready!");
    status.value = GameConnectionStatus.CONNECTED;
  });
  status.value = GameConnectionStatus.WAITING;
});
const gameMetadata = <Game>gameReq.data.value;
const letters = reactive<Letter[]>(convertSequence(gameMetadata.characters));
const queue = reactive<Letter[]>([]);
const moves = ref<Move[]>([]);
const toggleLetter = (letter: Letter) => {
  letter.active = !letter.active;
  if (letter.inQueue) {
    // activate corresponding letter in the global letters
    const l = letters.find((l) => l.id == letter.id);
    if (l) {
      l.active = false;
    }
  }
  if (letter.active) {
    queue.push({ ...letter, inQueue: true });
  } else {
    queue.splice(queue.indexOf(letter), 1);
  }
};

const popFromQueue = () => {
  const lastLetter = queue.pop();
  if (!lastLetter) return;
  const l = letters.find((l) => l.id == lastLetter.id);
  if (l) {
    l.active = false;
  }
};

const appendMove = async () => {};
const addMove = async () => {
  if (queue.length == 0) return;
  const guess = queue.map((l) => l.value).join("");
  const word = await verifyWord(guess);
  const valid = !!word;
  const points = valid ? getPoints(guess) : 0;
  if (!valid) {
    const newMove: Move = {
      id: "4",
      game: gameMetadata,
      guess,
      points,
      valid,
      user: userStore.user,
    };
    moves.value.push(newMove);
  } else {
    const newMove: Move = {
      id: "4",
      game: gameMetadata,
      guess,
      points,
      valid,
      user: userStore.user,
      definition: word.definition,
    };
    moves.value.push(newMove);
  }
  resetLetters();
};

const resetLetters = () => {
  for (const letter of queue) {
    if (letter.active) {
      const l = letters.find((l) => l.id == letter.id);
      if (l) {
        l.active = false;
      }
      letter.inQueue = false;
      letter.active = false;
    }
  }
  queue.length = 0;
};
</script>
