<template>
  <div class="w-full bg-primary text-seasalt font-bold">
    <nav
      class="py-4 px-16 border-b-2 border-secondary flex justify-center text-lg"
    >
      <div class="w-11/12 grid grid-cols-2 items-center">
        <p class="max-w-md">Spellsword</p>
        <div class="flex justify-end space-x-2">
          <button class="btn btn-secondary btn-outline">Login</button>
          <button class="btn btn-secondary text-primary">Register</button>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
