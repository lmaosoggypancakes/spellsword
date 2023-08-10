<template>
  <AppLayout>
    <div class="w-full pt-8 lg:pt-20 px-8 lg:px-20 overflow-hidden h-full">
      <div
        class="flex flex-col items-center text-accent overflow-hidden h-full"
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
            href="/"
            >Friends</NuxtLink
          >
        </div>
        <slot />
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
