<template>
  <!-- <Popover class="flex flex-row-reverse"

  </Popover> -->
  <div class="dropdown dropdown-end">
    <label tabindex="0">
      <Button type="secondary" class="btn-outline">Login</Button>
    </label>
    <form
      class="bg-info dropdown-content border-2 border-info p-6 rounded-xl z-[1] w-72 space-y-4 mt-8"
      @submit.prevent="login"
    >
      <input
        type="text"
        placeholder="Username"
        class="input input-bordered w-full max-w-xs"
        v-model="username"
      /><input
        type="text"
        placeholder="Password"
        class="input input-bordered w-full max-w-xs"
        v-model="password"
      />
      <span
        v-if="errorText"
        class="text-xs text-red-400"
        v-html="errorText"
      ></span>
      <Button type="info" class="w-full" :loading="status == 'loading'"
        >Submit
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from "axios";

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
