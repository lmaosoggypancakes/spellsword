<template>
  <div
    class="navbar bg-base-100 z-10 place-self-center rounded-2xl mt-4 px-8 p-0"
  >
    <div class="navbar-start lg:hidden">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-info btn-outline">
          <div class="swap swap-rotate">
            <input type="checkbox" />
            <Icon name="quill:hamburger" class="h-6 w-6 swap-off" />
            <Icon name="quill:escape" class="h-6 w-6 swap-on" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
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
const mobileDropdownToggled = ref(false);
</script>
