<template>
  <div
    class="navbar bg-base-100 z-20 place-self-center rounded-2xl mt-4 px-8 p-0"
  >
    <div class="navbar-start lg:hidden">
      <div>
        <label class="btn btn-info btn-outline" @click="toggleDropdown()">
          <div class="swap swap-rotate">
            <input type="checkbox" @click.stop />
            <Icon name="quill:hamburger" class="h-6 w-6 swap-off" />
            <Icon name="quill:escape" class="h-6 w-6 swap-on" />
          </div>
        </label>
        <Transition @leave="(el, done) => motion.pop.leave(done)">
          <ul
            v-if="dropdown"
            class="absolute menu menu-sm mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
            v-motion-fade
            v-motion="'pop'"
          >
            <li>
              <NuxtLink
                href="/login"
                class="link link-info"
                @click="alert('jsoef')"
                >Login</NuxtLink
              >
            </li>

            <li>
              <NuxtLink href="/register" class="link link-info"
                >Register</NuxtLink
              >
            </li>
          </ul>
        </Transition>
      </div>
    </div>
    <div class="flex-1 justify-end lg:justify-start">
      <NuxtLink href="/"><BrandLettering :small="true" /></NuxtLink>
    </div>
    <div class="flex-none hidden lg:flex">
      <ul class="menu menu-horizontal">
        <div class="flex justify-end space-x-2">
          <LinkWithSound href="/login"
            ><Button type="secondary">Login</Button></LinkWithSound
          >
          <LinkWithSound href="/register">
            <Button fill type="secondary">Register</Button>
          </LinkWithSound>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { useMotions } from "@vueuse/motion";

const motion = useMotions();
const [dropdown, toggleDropdown] = useToggle(false);
</script>
