<template>
  <div class="w-full text-seasalt font-bold min-h-screen flex flex-col">
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-3xl">Spellsword</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <div class="flex justify-end space-x-2">
            <Login />
            <Button type="primary" :loading="false">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </ul>
      </div>
    </div>
    <slot />
  </div>
</template>
