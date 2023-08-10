<template>
  <div
    class="grid lg:w-[90vw] h-[70vh] overflow-y-auto overflow-x-hidden w-full place-items-center lg:p-12 p-2 gap-y-8"
    v-if="!pending && data"
  >
    <Game v-for="s in userGameStatistics" :stats="s" />
    <dialog id="modal" class="modal modal-bottom sm:modal-middle">
      <form
        method="dialog"
        class="modal-box h-[70vh] lg:h-auto bg-accent flex flex-col items-stretch"
      >
        <h3 class="font-bold text-2xl text-center">Match Details</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action mt-auto">
          <button class="btn mt-auto w-full">Close</button>
        </div>
      </form>
    </dialog>
  </div>
  <Loader v-if="pending" />
</template>

<script setup lang="ts">
import { UserEdit, PlayerGame, User, GameStatus, Activity } from "@/types";
const config = useRuntimeConfig();
const user = useUser();
const { data, pending } = await useLazyFetch(
  `${config.public.apiUrl}/api/users/${user.id}/games`,
  { server: false }
);

const userGameStatistics = ref([]);

watch(data, (newData) => {
  userGameStatistics.value = newData.map((game) =>
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
