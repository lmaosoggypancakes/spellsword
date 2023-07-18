<template>
  <div
    class="navbar bg-base-100 z-10 place-self-center rounded-2xl mt-4 px-8 p-0"
  >
    <div class="flex-1">
      <NuxtLink href="/"><BrandLettering :small="true" /></NuxtLink>
    </div>
    <div class="flex-none">
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
