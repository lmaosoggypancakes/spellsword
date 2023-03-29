<template>
  <form
    class="w-3/5 md:w-2/5 rounded-md flex-1 my-8 border-2 border-secondary"
    @submit.prevent=""
  >
    <span class="block text-center px-2 py-4 text-2xl bg-secondary text-primary"
      >Register</span
    >
    <div>
      <TextInput name="Username" type="text" />
      <TextInput name="Password" type="password" />
      <button>Submit</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import TextInput from "@/components/form/text_input.vue";
</script>
