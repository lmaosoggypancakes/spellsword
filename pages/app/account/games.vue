<template>
  <div
    class="grid lg:w-[90vw] h-[70vh] overflow-y-auto overflow-x-hidden w-full place-items-center lg:p-12 p-2 gap-y-8"
  >
    <ClientOnly>
      <Suspense>
        <Game v-for="s in userGameStatistics" :stats="s" />
      </Suspense>
      <template #placeholder>
        <Icon name="material-symbols:swords" class="animate-spin h-16 w-16" />
      </template>
      <dialog id="modal" class="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          class="modal-box h-[70vh] lg:h-auto bg-accent flex flex-col items-stretch"
        >
          <h3 class="font-bold text-2xl text-center">Match Details</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action mt-auto">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn mt-auto w-full">Close</button>
          </div>
        </form>
      </dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { UserEdit, PlayerGame, User, GameStatus, Activity } from "@/types";
const config = useRuntimeConfig();
const user = useUser();
const userGames = <PlayerGame[]>(
  (await useFetch(`${config.public.apiUrl}/api/users/${user.id}/games`)).data
    .value
);
setTimeout(() => {}, 3000);
const userGameStatistics = userGames.map((game) =>
  getGameStatistics(
    game.moves,
    user,
    game.players.find((player) => player.username != user.username)!,
    game
  )
);
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
