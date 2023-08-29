<template>
  <div
    class="grid lg:w-[90vw] h-[70vh] overflow-y-auto overflow-x-hidden w-full place-items-center lg:p-12 p-2 gap-y-8"
    v-if="!pending && data"
  >
    <Game v-for="s in userGameStatistics" :stats="s" @click="shownGame = s" />
    <dialog id="modal" class="modal modal-bottom sm:modal-middle text-primary">
      <form
        method="dialog"
        class="modal-box h-[70vh] lg:h-auto bg- flex flex-col items-stretch"
      >
        <h3 class="font-bold text-4xl text-center mb-8">
          {{ shownGame?.characters }}
        </h3>
        <section class="flex justify-between">
          <div>
            <img :src="shownGame?.opponent.picture" class="rounded-full h-24 w-24" />
            <p class="mt-2 font-bold text-xl">{{ shownGame?.opponent.username }}</p>
          </div>
          <div>
            <img :src="shownGame?.player.picture" class="rounded-full h-24 w-24" />
            <p class="mt-2 font-bold text-xl text-right">{{ shownGame?.player.username}}</p>
          </div>
        </section>
        <div class="modal-action mt-auto">
          <button class="btn mt-auto w-full">Close</button>
        </div>
      </form>
    </dialog>
  </div>
  <Loader v-if="pending" />
</template>

<script setup lang="ts">
import {
  UserEdit,
  PlayerGame,
  User,
  GameStatus,
  Activity,
  GameStatistics,
} from "@/types";
const config = useRuntimeConfig();
const user = useUser();
const { data, pending } = await useLazyFetch(
  `${config.public.apiUrl}/api/users/${user.id}/games`,
  { server: false }
);

const shownGame = ref<GameStatistics | null>(null);
const userGameStatistics = ref<GameStatistics[]>([]);

watch(data, (newData) => {
  console.log(data);
  userGameStatistics.value = newData
    .sort((a, b) => new Date(b.timestamp) > new Date(a.timestamp))
    .map((game) =>
      getGameStatistics(
        game.moves,
        user,
        game.players.find((player) => player.username != user.username)!,
        game
      )
    );
});

definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
