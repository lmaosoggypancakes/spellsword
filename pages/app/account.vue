<template>
  <div class="w-full h-full pt-20 px-20 flex overflow-y-auto">
    <div
      class="grow flex flex-col items-center space-y-4 text-accent"
      v-motion-slide-bottom
    >
      <Popover class="">
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
          <img
            v-for="avatar in avatarUrls"
            :src="avatar"
            class="p-1 w-44 h-44 rounded-xl border-2 border-primary hover:border-secondary"
            @click="edits.picture = avatar"
          />
        </PopoverPanel>
      </Popover>
      <span class="text-4xl cursor-text">{{ user.username }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserEdit } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
definePageMeta({
  middleware: ["auth"],
  layout: "app",
});

const config = useRuntimeConfig();
const avatarUrls = Array(8)
  .fill(0)
  .map((x, i) => `${config.public.apiUrl}/static/images/avatars/${i + 1}.png`);
const user = useUser();
const editUsername = ref(false);
const edits = reactive<UserEdit>({
  email: user.email,
  picture: user.picture,
});
const editsMade = computed(() => {
  return edits.email != user.email || edits.picture != user.picture;
});
</script>
