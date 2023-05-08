<template>
  <span class="block text-center px-2 py-4 text-2xl">Register</span>
  <form class="w-4/5 md:w-3/5 rounded-md flex-1 my-8" @submit.prevent="">
    <div
      class="grid grid-cols-2 place-items-center justify-items-center flex-1"
    >
      <div class="space-y-4">
        <TextInput name="Username" type="text" v-model="username" />
        <TextInput name="Password" type="password" v-model="password" />
        <TextInput name="Email" type="text" v-model="email" />
      </div>
      <Popover>
        <PopoverButton class="outline-none">
          <img
            :src="picture"
            class="rounded-xl w-52 h-52 border-4 border-seasalt hover:border-secondary"
          />
        </PopoverButton>
        <PopoverPanel
          class="absolute right-0 z-10 bg-primary rounded-md w-[50vw] h-[40vh] grid grid-cols-3 overflow-auto"
          v-motion-slide-top
        >
          <ImageGallery v-model="picture" />
        </PopoverPanel>
      </Popover>
    </div>
    <div class="w-full flex flex-col items-center justify-center mt-16">
      <div class="my-4">
        <input type="checkbox" class="mr-4" />
        <span
          >I agree to use Spellsword in a fair manner that will facilitate the
          learning of both myself and others. I will not use any external tools
          or services that might give me an unfair advantage in matches.</span
        >
      </div>
      <Button
        type="secondary"
        class="w-[80%]"
        :loading="loading"
        :disabled="ready"
        @click="register()"
        >Register</Button
      >
    </div>
  </form>
  <ErrorToast v-if="error" />
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ErrorToast from "@/components/toasts/error.vue";
import ImageGallery from "@/components/app/imageGallery.vue";
import axios from "axios";

const router = useRouter();
const config = useRuntimeConfig();
const username = ref("");
const password = ref("");
const email = ref("");
const picture = ref(
  "https://spellsword.up.railway.app/static/images/avatars/1.png"
);
const agreedToTerms = ref(false);
const ready = computed(() => {
  return (
    username.value &&
    password.value &&
    email.value &&
    picture.value &&
    agreedToTerms.value
  );
});
const loading = ref(false);
const error = ref<null | string>(null);
const register = async () => {
  loading.value = true;
  loading.value;
  try {
    const response = await axios.post(`${config.public.apiUrl}/api/users`, {
      username: username.value,
      password: password.value,
      picture: picture.value,
      email: email.value,
    });
    if (response.status == 201) {
      // user was created
      router.push("/");
    }
  } catch (err: any) {
    loading.value = false;
    error.value = handleRegistrationError(err);
  }
};
</script>
