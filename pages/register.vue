<template>
  <div class="w-full flex flex-col items-center flex-grow font-normal">
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/register/register_form.vue";
definePageMeta({
  layout: "index",
});
</script>
