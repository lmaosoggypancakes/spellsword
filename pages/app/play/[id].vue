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
          'hidden lg:flex': !isMyTurn,
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]':
            isMyTurn && gameStatus != GameStatus.PLAYER_SUDDEN_DEATH,
          'shadow-[inset_0px_0px_10px_5px_rgba(219,45,45,1)]':
            gameStatus == GameStatus.PLAYER_SUDDEN_DEATH,
        }"
      >
        <div class="flex flex-col items-center">
          <span class="text-4xl">{{ userStore.username }}</span>
          <div class="inline badge badge-accent" v-if="isMyTurn">
            Your turn!
          </div>
        </div>
        <Avatar :src="userStore.picture" />
        <ul class="flex flex-row space-x-8 my-4">
          <LetterBlock
            v-for="letter in queue"
            :letter="letter"
            @toggle="toggleLetter(letter, true)"
            :id="letter.id"
            :disabled="false"
            :queue="true"
          />
        </ul>
        <Button
          v-if="isMyTurn && queue.length > 0"
          type="secondary"
          @click="appendMove()"
        >
          <Icon name="uil:enter" />
        </Button>
        <div class="absolute bottom-4 right-4 p-4 rounded-md text-2xl">
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
        class="col-span-3 p-8 items-center flex-col space-y-4 relative"
        :class="{
          'hidden lg:flex': isMyTurn,
          'shadow-[inset_0px_0px_10px_5px_rgba(169,255,203,1)]':
            !isMyTurn && gameStatus != GameStatus.OPPONENT_SUDDEN_DEATH,
          'shadow-[inset_0px_0px_10px_5px_rgba(219,45,45,1)]':
            gameStatus == GameStatus.OPPONENT_SUDDEN_DEATH,
        }"
      >
        <span class="text-4xl text-center block">{{ opponent?.username }}</span>
        <Avatar :src="opponent?.picture || ''" />
        <div class="absolute bottom-4 left-4 bg- p-4 rounded-md text-2xl">
          +{{ opponentPoints }} Points
        </div>
      </div>
    </div>
    <div class="w-full grid mt-auto border-t-2 border-secondary justify-center">
      <ul
        class="my-4 grid grid-flow-col grid-rows-2 w-screen lg:justify-center justify-start gap-x-4 overflow-auto place-self-center"
      >
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
  <Waiting v-if="status == GameConnectionStatus.WAITING" />
  <Connecting v-if="status == GameConnectionStatus.CONNECTING" />
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
              class="w-full max-w-md transform overflow-hidden text-primary p-6 text-left align-middle shadow-xl transition-all border-4 bg-secondary border-primary rounded-xl"
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
                Draw :/
              </DialogTitle>
              <DialogDescription>
                <table class="mx-auto mt-8">
                  <thead>
                    <tr>
                      <th class="border border-slate-600 p-4 bg-accent"></th>
                      <th class="border border-slate-600 p-4 bg-accent">
                        {{ userStore.username }}
                      </th>
                      <th class="border border-slate-600 p-4 bg-accent">
                        {{ opponent?.username }}
                      </th>
                    </tr>
                  </thead>
                  <tr>
                    <td class="border border-slate-700 p-4 bg-accent">
                      Points
                    </td>
                    <td
                      class="border border-slate-700 p-4 text-center bg-accent"
                    >
                      {{ gameStatistics.playerPoints }}
                    </td>
                    <td
                      class="border border-slate-700 p-4 text-center bg-accent"
                    >
                      {{ gameStatistics.opponentPoints }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-700 p-4 bg-accent">
                      Word Accuracy
                    </td>
                    <td
                      class="border border-slate-700 p-4 text-center bg-accent"
                    >
                      {{ gameStatistics.playerAccuracy }}%
                    </td>
                    <td
                      class="border border-slate-700 p-4 text-center bg-accent"
                    >
                      {{ gameStatistics.opponentAccuracy }}%
                    </td>
                  </tr>
                </table>
                <Button class="w-full p-4 bg-primary mt-4" @click="closeGame()">
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
import { Howl } from "howler";
import letterClick from "@/assets/letter_click.mp3";
import enterClick from "@/assets/enter_click.mp3";
import winTone from "@/assets/win_tone.mp3";
import loseTone from "@/assets/lose_tone.mp3";
import suddenDeathTone from "@/assets/sudden_death.mp3";
import notAllowedTone from "@/assets/not_allowed.mp3";
import { useVibrate } from "@vueuse/core";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import axios from "axios";

const { vibrate, stop, isSupported } = useVibrate({ pattern: [100, 100, 100] });
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
const letterClickSound = new Howl({ src: [letterClick] });
const enterClickSound = new Howl({ src: [enterClick] });
const winToneSound = new Howl({ src: [winTone] });
const loseToneSound = new Howl({ src: [loseTone] });
const suddenDeathSound = new Howl({ src: [suddenDeathTone] });
const notAllowedSound = new Howl({ src: [notAllowedTone] });
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
      toggleLetter(possibleLetter, false);
    }
  }
});

const toggleLetter = (letter: Letter, active = false) => {
  if (!isMyTurn.value) {
    notAllowedSound.play();
    vibrate();
    return;
  }
  letterClickSound.play();
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
  const lastLetter = queue[queue.length - 1];
  // assumes lastLetter.active is true
  if (!lastLetter) return;
  toggleLetter(lastLetter);
};

const appendMove = async (data: Move | undefined = undefined) => {
  enterClickSound.play();
  if (data) {
    moves.value.push(data);
    return;
  }
  const move = await getMove();
  if (move && isMyTurn.value) {
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
  if (points.value >= MAX_SCORE && opponentPoints.value >= MAX_SCORE) {
    return GameStatus.DRAW;
  }
  if (
    points.value >= MAX_SCORE &&
    isMyTurn.value &&
    opponentPoints.value < MAX_SCORE
  ) {
    return GameStatus.WIN;
  }
  if (
    opponentPoints.value >= MAX_SCORE &&
    !isMyTurn.value &&
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

  return GameStatus.PLAYING;
});
watch(gameStatus, (status) => {
  if (status == GameStatus.LOSS) {
    loseToneSound.play();
  }
  if (status == GameStatus.WIN) {
    winToneSound.play();
  }
  if (
    status == GameStatus.PLAYER_SUDDEN_DEATH ||
    status == GameStatus.OPPONENT_SUDDEN_DEATH
  ) {
    suddenDeathSound.play();
  }
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

onMounted(() => {
  setDiscordActivity(Activity.playing);
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
  socket.on("you're-next", () => {
    isMyTurn.value = false;
  });
  status.value = GameConnectionStatus.WAITING;
});
</script>
