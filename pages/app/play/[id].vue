<template>
  <div class="h-screen w-screen">
    <ul class="flex space-x-4">
      <LetterBlock
        v-for="letter in letters"
        :letter="letter"
        @toggle="toggleLetter"
        :id="letter.id"
      />
    </ul>
    <ul class="flex space-x-4 fixed bottom-0">
      <LetterBlock
        v-for="letter in queue"
        :letter="letter"
        @toggle="toggleLetter"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import LetterBlock from "@/components/app/play/letterBlock.vue";
import { Letter } from "@/types";
import { Game } from "@/types";
definePageMeta({
  layout: "lobby",
  middleware: ["auth"],
  scrollToTop: true,
});

useKeydownEvent((event) => {
  if (event.key == "Backspace") {
    popFromQueue();
  }
});

const config = useRuntimeConfig();
const route = useRoute();
const gameReq = await useFetch(
  `${config.public.apiUrl}/api/games/${route.params.id}`
);
const gameMetadata = <Game>gameReq.data.value;
const letters = ref<Letter[]>(convertSequence(gameMetadata.characters));
const queue = ref<Letter[]>([]);
const toggleLetter = (letter: Letter) => {
  letter.active = !letter.active;
  if (letter.inQueue) {
    // activate corresponding letter in the global letters
    const l = letters.value.find((l) => l.id == letter.id);
    if (l) {
      l.active = false;
    }
  }
  if (letter.active) {
    queue.value.push({ ...letter, inQueue: true });
  } else {
    queue.value.splice(queue.value.indexOf(letter), 1);
  }
};

const popFromQueue = () => {
  const lastLetter = queue.value.pop();
  if (!lastLetter) return;
  const l = letters.value.find((l) => l.id == lastLetter.id);
  if (l) {
    l.active = false;
  }
};
</script>
