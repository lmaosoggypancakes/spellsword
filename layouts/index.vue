<template>
  <div class="w-full text-seasalt font-bold min-h-screen flex flex-col">
    <nav
      class="py-4 px-16 border-b-2 border-secondary flex justify-center text-lg"
    >
      <div class="w-11/12 grid grid-cols-2 items-center">
        <NuxtLink href="/" class="max-w-md">Spellsword</NuxtLink>
        <div class="flex justify-end space-x-2">
          <Login />
          <Button type="primary" :loading="false">
            <NuxtLink href="/register">Register</NuxtLink>
          </Button>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
