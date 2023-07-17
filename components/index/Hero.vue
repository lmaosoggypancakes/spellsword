<template>
  <!-- <div class="p-16">
    <div class="h-full md:grid md:grid-cols-2">
      <div class="flex justify-center mt-36 h-full">
        <div class="md:max-w-md sm:max-w-full space-y-4">
          <span
            class="lg:text-6xl font-extrabold text-4xl text-center lg:text-left block"
            v-motion="{
              initial: { opacity: 0, y: -30 },
              enter: { opacity: 1, y: 0 },
            }"
          >
            All power begins with a little bit of
            <span id="headline">knowledge.</span>
          </span>
          <p
            v-motion="{
              initial: { opacity: 0, y: -30 },
              enter: { opacity: 1, y: 0, transition: { delay: 200 } },
            }"
            class="font-medium"
          >
            Spellsword is an interactive web-based game designed to improve our
            command of the english language.
          </p>
          <div class="flex flex-col justify-center">
            <NuxtLink
              class="btn btn-accent text-primary mt-8"
              v-motion="{
                initial: { opacity: 0 },
                enter: { opacity: 1, transition: { delay: 200 } },
              }"
              href="#about"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
      <img
        src="/logo.png"
        v-motion="{
          initial: { opacity: 0 },
          enter: { opacity: 1, transition: { delay: 400 } },
        }"
      />
    </div>
  </div> -->
  <div id="hero" class="h-screen grid place-items-center">
    <img src="/logo.png" class="h-96 w-96" />
  </div>
</template>

<style>
#headline {
  /** TEXT GRADIENT */
  color: #2dc7d3;
  background-image: -webkit-linear-gradient(45deg, #2dc7d3 6%, #fcd0a1 82%);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}

#hero {
  background-image: url("/banner.png");
  background-attachment: fixed;
}
</style>
