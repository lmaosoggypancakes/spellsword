<template>
  <div class="grid lg:grid-cols-2 min-h-screen">
    <nuxt-img
      class="mx-auto my-auto lg:block hidden"
      src="/logo.png"
      height="512"
      width="512"
    />
    <div class="h-full flex items-center">
      <div class="h-[80%] w-full flex flex-col items-center space-y-8">
        <nuxt-img
          class="block lg:hidden"
          src="/logo.png"
          height="128"
          width="128"
        />
        <span class="text-5xl md:text-7xl text-center" id="name"
          >Spellsword</span
        >
        <p class="text-center font-normal max-w-md">
          An interactive word-based game designed to improve our command of the
          english language.
        </p>
        <form class="space-y-8 md:max-w-md mx-16 md:mx-0" @submit.prevent>
          <IconTextInput
            name="mdi:account"
            type="text"
            placeholder="Username"
            v-model="username"
          />
          <div>
            <IconTextInput
              name="mdi:key"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <NuxtLink href="/" class="text-xs float-right hover:underline"
              >Forgot your password?</NuxtLink
            >
          </div>
          <Button
            type="secondary"
            class="w-full"
            :loading="status === 'loading'"
            @click="login()"
            >Login</Button
          >
          <span class="text-sm text-center block">
            New here?
            <NuxtLink href="/register" class="link">
              Create an Account
            </NuxtLink>
          </span>
          <div class="hidden lg:divider">or login with</div>
          <div class="grid lg:grid-cols-2 gap-4">
            <button class="btn btn-outline btn-accent">
              <Icon name="uil:google" class="w-8 h-8" />
              <!-- <span>Log in with Google</span> -->
            </button>
            <button class="btn btn-outline btn-accent mb-8 md:mb-0">
              <Icon name="uil:github" class="w-8 h-8" />
              <!-- <span>Log in with GitHub</span> -->
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

definePageMeta({
  layout: "index",
});
/* Vue composables to gain access to the page's metadata like underlying router and runtime configuration of shared variables */
const router = useRouter();
const config = useRuntimeConfig();
const auth = useAuth();

/* string variables wrapped in a reactivity frame to allow for 2-way data binding between text inputs and the underlying variable */
const username = ref<string>("");
const password = ref<string>("");
const errorText = ref<string>("");
type Status = "loading" | "normal";
const status = ref<Status>("normal");

/* helper function to login and set the authenticated token in the browser's cookie, if the username/password combo is correct. */
const login = async () => {
  status.value = "loading";
  try {
    const response = await axios.post(`${config.public.apiUrl}/auth/login`, {
      username: username.value,
      password: password.value,
    });
    const jwt = response.data.access_token;
    await auth.authenticate(jwt); // decodes the JSON Web Token to extract the user metadata, storing it as well. Cookies are used for storage instead of things like localStorage or SessionStorage, as they are often prone to self-XSS scripts
    status.value = "normal";
    router.push("/app/play");
  } catch (error: any) {
    if (error.status != 201) {
      // 201 is used instead of 200, because a JWT is created on the server-side. if the username/password combo is incorrect, the server will through either an HTTP 400, 401 or 403, depending on the request data submitted.
      errorText.value = "Username/password combination is invalid";
      status.value = "normal";
    }
  }
};
</script>

<style>
#name {
  /** TEXT GRADIENT */
  color: #2dc7d3;
  background-image: -webkit-linear-gradient(45deg, #2dc7d3 6%, #fcd0a1 82%);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
