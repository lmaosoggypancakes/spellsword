<template>
  <div id="hero" class="h-screen flex flex-col justify-between">
    <div class="grid grid-cols-2 place-items-center justify-center h-full z-10">
      <img src="/logo_transparent.png" class="h-96 w-96" />
      <div class="flex flex-col justify-center space-y-32">
        <div>
          <p class="block brand text-7xl text-center">
            <span class="text-[#4ab5cd] text-shadow-lg shadow-[#4ab5cd]"
              >Spell</span
            ><span class="text-[#e8746a] text-shadow-lg shadow-[#e8746a]"
              >sword</span
            >
          </p>
          <p class="mt-4">
            An interactive word-based game designed to improve our command of
            the English language.
          </p>
        </div>
        <Button>Get Started</Button>
      </div>
    </div>
    <HeroToDownloadDivider />
  </div>
</template>

<style>
@font-face {
  font-family: "Roxborough CF";
  src: url("/assets/fonts/Roxborough CF.ttf");
}
.brand {
  font-family: "Roxborough CF";
}
#hero {
  position: relative;
}
#hero::after {
  content: "";
  background-image: url("/banner.png");
  background-attachment: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  opacity: 40%;
}
</style>
