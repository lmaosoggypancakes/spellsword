<template>
  <Popover title="Login"
    ><form
      class="mt-2 bg-raisin border-2 border-secondary p-6 w-72 h-64 rounded-xl"
      @submit.prevent="login"
    >
      <TextInput name="Username" type="text" v-model="username" />
      <TextInput name="Password" type="password" v-model="password" />
      <Button type="primary" class="w-full mt-4">Submit</Button>
    </form>
  </Popover>
</template>

<script setup lang="ts">
import axios from "axios";
import TextInput from "../form/text_input.vue";
import Button from "@/components/button.vue";
import Popover from "@/components/popover";

const username = ref<string>("");
const password = ref<string>("");
const auth = useAuth();
const login = async () => {
  console.log(username.value, password.value);
  const response = await axios.post(
    "https://spellsword.up.railway.app/auth/login",
    {
      username: username.value,
      password: password.value,
    }
  );
  const jwt = response.data.access_token;
  await auth.authenticate(jwt);
  alert("authenticated with jwt " + jwt);
};
</script>
