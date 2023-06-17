<template>
  <div
    class="h-screen w-screen flex flex-col max-h-screen"
    :class="
      gameStatus == GameStatus.DRAW ||
      gameStatus == GameStatus.LOSS ||
      gameStatus == GameStatus.WIN
        ? 'blur-sm'
        : ''
    "
  >
    <div class="grow grid lg:grid-cols-7 h-full max-h-screen overflow-y-auto">
      <div
        class="col-span-3 p-8 flex items-center flex-col space-y-4 relative"
        :class="{
          hidden: !isMyTurn,
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]':
            isMyTurn && gameStatus != GameStatus.PLAYER_SUDDEN_DEATH,
          'shadow-[inset_0px_0px_10px_5px_rgba(219,45,45,1)]':
            gameStatus == GameStatus.PLAYER_SUDDEN_DEATH,
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
            @toggle="toggleLetter(letter, true)"
            :id="letter.id"
            :disabled="false"
            :queue="true"
          />
        </ul>
        <div
          class="absolute bottom-4 right-4 bg-apricot p-4 rounded-md text-2xl text-primary"
        >
          +{{ points }} Points
        </div>
      </div>
      <div class="border-x-2 border-secondary overflow-y-auto hidden lg:block">
        <ul>
          <MoveCard
            :move="move"
            v-for="move in moves"
            :opponent="move.userId !== userStore.id"
          />
        </ul>
      </div>
      <div
        class="col-span-3 p-8 flex items-center flex-col space-y-4 relative"
        :class="{
          hidden: isMyTurn,
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]':
            !isMyTurn && gameStatus != GameStatus.OPPONENT_SUDDEN_DEATH,
          'shadow-[inset_0px_0px_10px_5px_rgba(219,45,45,1)]':
            gameStatus == GameStatus.OPPONENT_SUDDEN_DEATH,
        }"
      >
        <span class="text-4xl text-center block text-seasalt">{{
          opponent?.username
        }}</span>
        <Avatar :src="opponent?.picture || ''" />
        <div
          class="absolute bottom-4 left-4 bg-apricot p-4 rounded-md text-2xl text-primary"
        >
          +{{ opponentPoints }} Points
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mt-auto border-t-2 border-secondary">
      <ul class="space-x-4 my-4">
        <LetterBlock
          v-for="letter in letters"
          :letter="letter"
          @toggle="toggleLetter"
          :id="letter.id"
          :disabled="!isMyTurn"
        />
      </ul>
    </div>
  </div>
  <WaitingToast v-if="status == GameConnectionStatus.WAITING" />
  <ConnectingToast v-if="status == GameConnectionStatus.CONNECTING" />
  <TransitionRoot
    appear
    :show="
      gameStatus == GameStatus.DRAW ||
      gameStatus == GameStatus.LOSS ||
      gameStatus == GameStatus.WIN
    "
    as="template"
  >
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden bg-apricot text-primary p-6 text-left align-middle shadow-xl transition-all border-4 border-raisin"
            >
              <DialogTitle
                as="h3"
                class="text-2xl font-medium leading-6 text-gray-900 text-center"
                v-if="gameStatus == GameStatus.WIN"
              >
                {{ userStore.username }} wins!
              </DialogTitle>
              <DialogTitle
                as="h3"
                class="text-2xl font-medium leading-6 text-gray-900 text-center"
                v-else-if="gameStatus == GameStatus.LOSS"
              >
                {{ opponent?.username }} wins!
              </DialogTitle>
              <DialogTitle
                as="h3"
                class="text-2xl font-medium leading-6 text-gray-900 text-center"
                v-else
              >
                Draw
              </DialogTitle>
              <DialogDescription>
                <table class="mx-auto mt-8">
                  <thead>
                    <tr>
                      <th
                        class="border border-slate-600 p-4 bg-orange-200"
                      ></th>
                      <th class="border border-slate-600 p-4 bg-orange-200">
                        {{ userStore.username }}
                      </th>
                      <th class="border border-slate-600 p-4 bg-orange-200">
                        {{ opponent?.username }}
                      </th>
                    </tr>
                  </thead>
                  <tr>
                    <td class="border border-slate-700 p-4 bg-orange-200">
                      Points
                    </td>
                    <td class="border border-slate-700 p-4 text-center">
                      {{ gameStatistics.playerPoints }}
                    </td>
                    <td class="border border-slate-700 p-4 text-center">
                      {{ gameStatistics.opponentPoints }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-700 p-4 bg-orange-200">
                      Word Accuracy
                    </td>
                    <td class="border border-slate-700 p-4 text-center">
                      {{ gameStatistics.playerAccuracy }}%
                    </td>
                    <td class="border border-slate-700 p-4 text-center">
                      {{ gameStatistics.opponentAccuracy }}%
                    </td>
                  </tr>
                </table>
                <Button
                  class="w-full p-4 bg-primary text-seasalt mt-4 hover:bg-raisin"
                  @click="closeGame()"
                >
                  Go Home
                </Button>
              </DialogDescription>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Activity, Letter, Move } from "@/types";
import { Game, GameConnectionStatus, GameStatus } from "@/types";
import { io, Socket } from "socket.io-client";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import axios from "axios";

const MAX_SCORE = 20;
const router = useRouter();
const auth = useAuth();
const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUser();
const isMyTurn = ref(true);
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

const letters = reactive<Letter[]>(convertSequence(gameMetadata.characters));
const sequence = letters
  .map((letter) => letter.value)
  .join("")
  .toLowerCase();
const queue = reactive<Letter[]>([]);
const moves = ref<Move[]>([]);
const points = computed(() => {
  let s = 0;
  moves.value.forEach((move) => {
    if (move.userId == userStore.id) {
      s += move.points;
    }
  });
  return s;
});
const opponentPoints = computed(() => {
  let s = 0;
  moves.value.forEach((move) => {
    if (move.userId != userStore.id) {
      s += move.points;
    }
  });
  return s;
});
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
  if (!isMyTurn.value) return;
  if (letter.active || active) {
    // if the letter is active (in queue), remove it from the queue
    // activate corresponding letter in the global letters
    const l = letters.find((l) => l.id == letter.id);
    if (l) {
      // set the letter as clickable again
      l.active = false;
    }
    queue.splice(queue.indexOf(letter), 1);
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
  if (move && isMyTurn.value) {
    // socket.emit("moves", move);
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
      userId: userStore.id,
    };
  } else {
    return {
      gameId: gameMetadata.id,
      guess,
      points,
      valid,
      userId: userStore.id,
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

const gameStatus = computed<GameStatus>(() => {
  if (
    points.value >= MAX_SCORE &&
    moves.value[moves.value.length - 1].userId != userStore.id &&
    opponentPoints.value < MAX_SCORE
  ) {
    return GameStatus.WIN;
  }
  if (
    opponentPoints.value >= MAX_SCORE &&
    moves.value[moves.value.length - 1].userId == userStore.id &&
    points.value < MAX_SCORE
  ) {
    return GameStatus.LOSS;
  }

  if (opponentPoints.value >= MAX_SCORE) {
    return GameStatus.PLAYER_SUDDEN_DEATH;
  }

  if (points.value >= MAX_SCORE) {
    return GameStatus.OPPONENT_SUDDEN_DEATH;
  }

  if (points.value >= MAX_SCORE && opponentPoints.value >= MAX_SCORE) {
    return GameStatus.DRAW;
  }
  return GameStatus.PLAYING;
});

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const closeGame = async () => {
  const winnerId =
    gameStatus.value == GameStatus.WIN
      ? userStore.id
      : gameStatus.value == GameStatus.LOSS
      ? opponent?.id
      : null;
  try {
    const response = await axios.put(
      `${config.public.apiUrl}/api/games/${gameMetadata.id}/game_over`,
      {
        winner_id: winnerId,
      }
    );
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};
const gameStatistics = computed(() => {
  return getGameStatistics(
    moves.value,
    userStore,
    opponent!,
    gameMetadata,
    gameStatus.value
  );
});
</script>
