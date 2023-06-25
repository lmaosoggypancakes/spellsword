<template>
  <div class="grid lg:grid-cols-2 p-4 justify-around" id="platforms">
    <div
      class="text-2xl p-4"
      v-motion="{
        initial: { opacity: 0, x: 30 },
        visibleOnce: {
          opacity: 1,
          x: 0,
          transition: { delay: 500 },
        },
      }"
    >
      <p class="text-5xl mb-8 transform">
        Embark on a quest and conquer rivals
      </p>
      With over 10 customized avatars to choose from, you can immerse yourself
      in a
      <span class="underline font-extrabold text-accent"
        >fits your lifestyle</span
      >
      and
      <span class="underline font-extrabold text-accent"
        >boosts your English</span
      >
      proficiency on the go.
    </div>
    <div class="flex flex-col justify-center">
      <div
        class="mockup-phone transform transition-none ease-in-out"
        :style="`transform: rotateZ(${rotate}deg)`"
        v-motion="{
          initial: { opacity: 0, x: -30 },
          visibleOnce: {
            opacity: 1,
            x: 0,
            transition: { delay: 500, duration: 1000 },
          },
        }"
      >
        <div class="camera"></div>
        <div class="display">
          <div class="artboard artboard-demo phone-1">
            <nuxt-img src="/logo.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
