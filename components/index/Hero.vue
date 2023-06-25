<template>
  <div class="p-16">
    <div class="h-full md:grid md:grid-cols-2">
      <div class="flex justify-center mt-36 h-full">
        <div class="md:max-w-md sm:max-w-full space-y-4">
          <span
            class="lg:text-5xl font-extrabold text-2xl"
            v-motion="{
              initial: { opacity: 0, y: -30 },
              enter: { opacity: 1, y: 0 },
            }"
          >
            All power begins with a little bit of
            <span class="text-secondary">knowledge.</span>
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
            <button
              class="btn btn-accent text-primary mt-8"
              v-motion="{
                initial: { opacity: 0 },
                enter: { opacity: 1, transition: { delay: 200 } },
              }"
            >
              Learn More
            </button>
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
  </div>
</template>

<script setup></script>
