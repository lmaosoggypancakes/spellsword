<template>
  <!-- <footer class="footer items-center p-4 bg-base-200 text-neutral-content">
    <div class="items-center grid-flow-col">
      <img src="/logo.png" height="64" width="64" />
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
  </footer> -->
  <footer class="footer p-10 bg-base-200 text-base-content">
    <div>
      <img src="/logo.png" height="128" width="128" />
      <p>
        Copyright Spellsword © {{ new Date().getFullYear() }} - All rights
        reserved
      </p>
    </div>
    <div>
      <span class="footer-title">Product</span>
      <LinkWithSound
        href="https://github.com/lmaosoggypancakes/spellsword"
        target="_blank"
        class="link hover:text-accent link-hover"
        >Open Source</LinkWithSound
      >
      <LinkWithSound
        href=""
        target="_blank"
        class="link hover:text-accent link-hover"
        >Status</LinkWithSound
      >
      <LinkWithSound
        href=""
        target="_blank"
        class="link hover:text-accent link-hover"
        >Developers</LinkWithSound
      >
      <LinkWithSound
        href=""
        target="_blank"
        class="link hover:text-accent link-hover"
        >About</LinkWithSound
      >
    </div>
    <div>
      <span class="footer-title">Legal</span>
      <LinkWithSound
        href="/acknowledgements"
        target="_blank"
        class="link hover:text-accent link-hover"
        >Acknowledgements</LinkWithSound
      >
      <LinkWithSound
        href="/privacy_policy"
        target="_blank"
        class="link hover:text-accent link-hover"
        >Privacy Policy</LinkWithSound
      >
    </div>
    <div>
      <span class="footer-title">Links</span>
      <div class="flex gap-8">
        <LinkWithSound
          href="https://github.com/github.com/lmaosoggypancakes/spellsword"
          target="_blank"
          class="link hover:text-accent link-hover"
          ><Icon name="uil:github" class="h-16 w-16"
        /></LinkWithSound>
        <LinkWithSound
          href="https://spellsword.xyz"
          target="_blank"
          class="link hover:text-accent link-hover"
          ><Icon name="uil:globe" class="h-16 w-16"
        /></LinkWithSound>
        <LinkWithSound
          href="https://spellsword.xyz"
          target="_blank"
          class="link hover:text-accent link-hover"
          ><Icon name="uil:youtube" class="h-16 w-16"
        /></LinkWithSound>
      </div>
    </div>
  </footer>
</template>
