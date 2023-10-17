<template>
  <div
    class="grid lg:w-[90vw] h-[70vh] overflow-y-auto overflow-x-hidden w-full place-items-center lg:p-12 p-2 gap-y-8"
    v-if="!pending && data"
  >
    <Game
      v-for="s in userGameStatistics"
      :stats="s"
      @click="() => changeShownGame(s)"
    />
    <dialog
      id="modal"
      class="modal modal-bottom sm:modal-middle text-primary"
      v-if="shownGame"
    >
      <form
        method="dialog"
        class="modal-box lg:h-auto flex flex-col items-stretch bg-primary-200 text-secondary border-2 border-secondary"
      >
        <h3 class="font-bold md:text-4xl text-center mb-8 text-3xl">
          {{ shownGame.characters }}
        </h3>
        <section class="flex justify-between">
          <div>
            <img
              :src="shownGame.opponent.picture"
              class="rounded-full h-24 w-24"
            />
            <p class="mt-2 font-bold text-xl">
              {{ shownGame.opponent.username }}
            </p>
          </div>
          <div>
            <img
              :src="shownGame.player.picture"
              class="rounded-full h-24 w-24"
            />
            <p class="mt-2 font-bold text-xl text-right">
              {{ shownGame.player.username }}
            </p>
          </div>
        </section>
        <section
          class="overflow-x-auto scrollbar-none h-full mt-4 flex flex-col overflow-y-hidden"
        >
          <div class="grid grid-cols-2 bg-primary text-accent rounded-md p-8">
            <ul>
              <li
                v-for="move in shownGame.moves"
                v-show="move.userId == shownGame.opponent.id"
                class="flex items-center max-w-xs w-full"
              >
                <span class="p-1 w-8 h-8 text-center font-bold"
                  >{{ move.points }}
                </span>
                <span>| {{ move.guess }}</span>
              </li>
            </ul>
            <ul class="text-right">
              <li
                v-for="move in shownGame.moves"
                v-show="move.userId == shownGame.player.id"
                class="flex justify-end items-center max-w-xs w-full"
              >
                <span> {{ move.guess }} |</span>
                <span class="p-1 w-8 h-8 text-center font-bold">{{
                  move.points
                }}</span>
              </li>
            </ul>
          </div>
          <div class="overflow-auto mt-4">
            <div class="stats shadow rounded-b-none w-full">
              <div class="stat place-items-start overflow-hidden">
                <div class="stat-title">Avg Word Length</div>
                <div class="stat-value text-secondary">
                  {{ shownGame.userAverageLength }}
                </div>
              </div>

              <div class="stat place-items-end overflow-hidden">
                <div class="stat-title">Avg Word Length</div>
                <div class="stat-value text-secondary">
                  {{ shownGame.opponentAverageLength }}
                </div>
              </div>
            </div>
            <div class="stats shadow rounded-t-none w-full">
              <div class="stat place-items-start overflow-hidden">
                <div class="stat-title">Accuracy</div>
                <div class="stat-value text-secondary">
                  {{ (+shownGame.opponentAccuracy).toFixed(1) }}%
                </div>
              </div>

              <div class="stat place-items-end overflow-hidden">
                <div class="stat-title">Accuracy</div>
                <div class="stat-value text-secondary">
                  {{ (+shownGame.playerAccuracy).toFixed(1) }}%
                </div>
              </div>
            </div>
          </div>
          <div class="modal-action p-2 mt-4">
            <Button type="secondary" class="w-full" fill>Close</Button>
          </div>
        </section>
      </form>
    </dialog>
  </div>
  <Loader v-if="pending" />
</template>

<script setup lang="ts">
import { GameStatistics, Game as TGame } from "@/types";
const config = useRuntimeConfig();
const user = useUser();
const { data, pending } = await useLazyFetch(
  `${config.public.apiUrl}/api/users/${user.id}/games`,
  { server: false }
);

const allGames = new Map();
const shownGame = ref<GameStatistics | null>(null);
const changeShownGame = (game: GameStatistics) => {
  shownGame.value = { ...game, ...allGames.get(game.id) };
};
const userGameStatistics = ref<GameStatistics[]>([]);

watch(data, (newData: TGame[]) => {
  newData.forEach((game: TGame) => allGames.set(game.id, game));
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
