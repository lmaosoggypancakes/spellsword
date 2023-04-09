<template>
  <Popover title="Login"
    ><form
      class="mt-2 bg-raisin border-2 border-secondary p-6 w-72 rounded-xl"
      @submit.prevent="login"
    >
      <TextInput name="Username" type="text" v-model="username" />
      <TextInput name="Password" type="password" v-model="password" />
      <span
        v-if="errorText"
        class="text-xs text-red-400"
        v-html="errorText"
      ></span>
      <Button type="primary" class="w-full mt-4" :loading="status == 'loading'"
        >Submit
      </Button>
    </form>
  </Popover>
</template>

<script setup lang="ts">
import axios, { AxiosError } from "axios";
import TextInput from "../form/text_input.vue";
import Button from "@/components/button.vue";
import Popover from "@/components/popover";

const router = useRouter();
const config = useRuntimeConfig();
const username = ref<string>("");
const password = ref<string>("");
const auth = useAuth();
const errorText = ref("");
type Status = "loading" | "normal";
const status = ref<Status>("normal");
const login = async () => {
  status.value = "loading";
  try {
    const response = await axios.post(`${config.public.apiUrl}/auth/login`, {
      username: username.value,
      password: password.value,
    });
    const jwt = response.data.access_token;
    await auth.authenticate(jwt);
    status.value = "normal";
    router.push("/app/play");
  } catch (error: any) {
    if (error.response.status == 401) {
      errorText.value = "Username/password combination is invalid";
      status.value = "normal";
    }
  }
};
</script>
