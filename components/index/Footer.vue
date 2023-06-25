<template>
  <footer class="footer items-center p-4 bg-base-200 text-neutral-content">
    <div class="items-center grid-flow-col">
      <nuxt-img src="/logo.png" height="64" width="64" />
      <p>
        Copyright Spellsword © {{ new Date().getFullYear() }} - All rights
        reserved
      </p>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <LinkWithSound href="https://github.com/lmaosoggypancakes/spellsword">
        <Icon name="uil:github" class="w-16 h-16 p-2" />
      </LinkWithSound>
    </div>
  </footer>
</template>
