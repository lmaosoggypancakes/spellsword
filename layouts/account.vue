<template>
  <AppLayout>
    <div class="w-full pt-8 lg:pt-20 px-8 lg:px-20 overflow-hidden">
      <div
        class="flex flex-col items-center text-accent overflow-hidden"
        v-motion-slide-bottom
      >
        <Popover title="Game Over!">
          <PopoverButton class="outline-none">
            <img
              :src="edits.picture"
              class="rounded-xl w-52 h-52 border-4 hover:border-secondary"
            />
          </PopoverButton>
          <PopoverPanel
            class="absolute z-10 bg-primary rounded-md w-[80vw] left-0 lg:w-[30vw] h-[60vh] grid grid-cols-2 overflow-auto place-items-center"
            v-motion-slide-top
          >
            <ImageGallery v-model="edits.picture" />
          </PopoverPanel>
        </Popover>

        <h1 class="text-5xl">
          {{ edits.username }}
        </h1>
        <div class="tabs mx-auto my-4 text-secondary">
          <NuxtLink
            active-class="tab-active"
            href="/app/account/games"
            class="tab tab-sm lg:tab-lg tab-lifted"
            >Previous Games</NuxtLink
          >
          <NuxtLink
            active-class="tab-active"
            href="/app/account/settings"
            class="tab tab-sm lg:tab-lg tab-lifted"
            >My Avatar</NuxtLink
          >
          <NuxtLink
            active-class="tab-active"
            class="tab tab-sm lg:tab-lg tab-lifted"
            href="/app/"
            >Friends</NuxtLink
          >
        </div>
        <slot />
        <!-- <form @submit.prevent class="flex justify-around w-full my-8">
          <TextInput v-model="edits.username" type="text" :name="'Username'" />
          <TextInput v-model="edits.email" type="text" :name="'Email'" />
        </form> -->
        <!-- <div
        class="grid lg:grid-cols-2 w-[90vw] h-[70vh] overflow-auto place-items-center rounded-md"
        >
          <div
            class="w-5/6 p-2 mx-4 my-2 flex flex-col border-2 rounded-md bg-primary pl-4"
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
            <span class="text-2xl text-center my-4 font-bold">{{
              stats.characters
            }}</span>
          </div>
        </div> -->
      </div>
    </div>
    <SaveChanges v-if="editsMade" :loading="editSaving" @click="save()" />
  </AppLayout>
</template>
<script setup lang="ts">
import { UserEdit, PlayerGame, User, GameStatus, Activity } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import axios from "axios";
import AppLayout from "@/layouts/app.vue";
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
    (edits.email != user.email && edits.email.length > 0) ||
    edits.picture != user.picture ||
    (edits.username != user.username && edits.username.length > 0)
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
