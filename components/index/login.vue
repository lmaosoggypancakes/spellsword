<template>
  <Popover title="Login"
    ><form
      class="mt-2 bg-raisin border-2 border-secondary p-6 w-72 h-64 rounded-xl"
      @submit.prevent="login"
    >
      <TextInput name="Username" type="text" />
      <TextInput name="Password" type="password" />
      <Button type="primary" class="w-full mt-4">Submit</Button>
    </form>
  </Popover>
</template>

<script setup lang="ts">
import axios from "axios";
import TextInput from "../form/text_input.vue";
import Button from "@/components/button.vue";
import Popover from "@/components/popover";
const login = async () => {};
</script>
