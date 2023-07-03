<template>
  <div class="grid lg:grid-cols-2 h-full">
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
            <NuxtLink
              href="/login/forgot"
              class="text-xs float-right hover:underline"
              >Forgot your password?</NuxtLink
            >
          </div>
          <Button type="secondary" class="w-full">Login</Button>
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
definePageMeta({
  layout: "base",
});

const username = ref("");
const password = ref("");
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
