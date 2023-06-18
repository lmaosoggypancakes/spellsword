<template>
  <div class="w-full pt-20 px-20 h-screen overflow-auto">
    <div
      class="flex flex-col items-center text-accent h-screen"
      v-motion-slide-bottom
    >
      <Popover title="Game Over!">
        <PopoverButton class="outline-none">
          <img
            :src="edits.picture"
            class="rounded-xl w-52 h-52 border-4 border-seasalt hover:border-secondary"
          />
        </PopoverButton>
        <PopoverPanel
          class="absolute z-10 bg-primary rounded-md w-[30vw] h-[60vh] grid grid-cols-2 overflow-auto place-items-center"
          v-motion-slide-top
        >
          <ImageGallery v-model="edits.picture" />
        </PopoverPanel>
      </Popover>

      <form
        @submit.prevent
        class="flex justify-around w-full my-8 text-seasalt"
      >
        <TextInput v-model="edits.username" type="text" :name="'Username'" />
        <TextInput v-model="edits.email" type="text" :name="'Email'" />
      </form>
      <div
        class="grid grid-cols-2 bg-primary w-[75vw] h-[70vh] overflow-auto place-items-center rounded-md border-primary border-8"
      >
        <div
          class="bg-raisin w-5/6 p-2 mx-4 my-2 flex flex-col border-2 rounded-md bg-opacity-30 pl-4"
          v-for="stats in userGameStatistics"
          :class="
            stats.status === GameStatus.WIN
              ? 'border-green-400'
              : stats.status === GameStatus.DRAW
              ? 'border-red-400'
              : 'border-gray-400'
          "
        >
          <div class="text-accent">
            <span class="float-left">
              <p class="text-4xl">
                {{ stats.playerPoints }}
              </p>
              <span> {{ stats.playerUsername }} </span>
            </span>
            <span class="float-right">
              <p class="text-4xl text-right">{{ stats.opponentPoints }}</p>
              <span class="">
                {{ stats.opponentUsername }}
              </span>
            </span>
          </div>
          <span class="text-2xl text-center my-4 text-seasalt font-bold">{{
            stats.characters
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <SaveChanges v-if="editsMade" :loading="editSaving" @click="save()" />
</template>
<script setup lang="ts">
import { UserEdit, PlayerGame, User, GameStatus, Activity } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import axios from "axios";

definePageMeta({
  middleware: ["auth"],
  layout: "app",
});
onMounted(() => {
  setDiscordActivity(Activity.avatar);
});
const config = useRuntimeConfig();
const auth = useAuth();
const user = useUser();
const edits = reactive<UserEdit>({
  email: user.email,
  username: user.username,
  picture: user.picture,
});
const editSaving = ref(false);
const userGames = <PlayerGame[]>(
  (await useFetch(`${config.public.apiUrl}/api/users/${user.id}/games`)).data
    .value
);
const userGameStatistics = userGames.map((game) =>
  getGameStatistics(
    game.moves,
    user,
    game.players.find((player) => player.username != user.username)!,
    game
  )
);
const editsMade = computed(() => {
  return (
    edits.email != user.email ||
    edits.picture != user.picture ||
    edits.username != user.username
  );
});

const save = async () => {
  editSaving.value = true;
  const response = await axios.put(
    `${config.public.apiUrl}/api/users/${user.id}/`,
    edits,
    {
      headers: {
        Authorization: `Bearer `,
      },
    }
  );

  editSaving.value = false;
  if (response.status == 200) {
    const newUser = <User>response.data;
    user.set(newUser);
  }
};
</script>
