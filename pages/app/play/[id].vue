<template>
  <div class="h-screen w-screen flex flex-col max-h-screen">
    <div class="grow grid grid-cols-7 h-full max-h-screen overflow-y-auto">
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
      <div class="border-x-2 border-secondary overflow-y-scroll">
        <u class="">
          <MoveCard
            :move="move"
            v-for="move in moves"
            :opponent="move.user !== userStore.user"
          />
        </u>
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
</template>

<script setup lang="ts">
import LetterBlock from "@/components/app/play/letterBlock.vue";
import MoveCard from "@/components/app/play/moveCard.vue";
import { Letter, Move } from "@/types";
import { Game } from "@/types";
definePageMeta({
  layout: "lobby",
  middleware: ["auth"],
  scrollToTop: true,
});

const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUser();
const gameReq = await useFetch(
  `${config.public.apiUrl}/api/games/${route.params.id}`
);
const gameMetadata = <Game>gameReq.data.value;
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
    addMove();
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

const addMove = async () => {
  if (queue.length == 0) return;
  const guess = queue.map((l) => l.value).join("");
  if (moves.value.map((move) => move.guess).includes(guess)) return;
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
      letter.active = false;
    }
  }
  queue.length = 0;
};
</script>
