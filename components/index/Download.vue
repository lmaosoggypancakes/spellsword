<template>
  <div
    class="md:min-h-screen bg-base-100 text-info font-sans overflow-x-hidden bg-gradient-to-b from-base-100 to-primary from-50% px-8 md:h-screen py-36 bg-transparent"
  >
    <div
      class="grid md:grid-cols-2 md:border-secondary md:border rounded-tl-2xl rounded-br-2xl md:border-opacity-30 h-full relative z-10"
    >
      <div
        class="place-self-center space-y-8 md:place-items-start flex flex-col items-center relative"
      >
        <div class="h-[50vh] w-[30vw] bubble-accent -bottom-52"></div>
        <h1 class="text-info uppercase md:text-3xl text-5xl z-10">
          The battlefield is yours
        </h1>
        <p class="text-white text-lg font-normal max-w-lg z-10">
          Spellsword is played between two players who race against the clock to
          construct words from a given seqeunce of letters. The player to
          out-score their opponent by creating more complex words wins!
        </p>
        <div
          class="stats shadow md:inline-grid grid md:grid-flow-col grid-flow-row md:space-y-0 space-y-8 md:w-min max-w-md w-full z-10"
        >
          <div
            class="stat md:w-full max-w-md place-self-center md:border border-none bg-primary rounded-sm"
          >
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Unique Games</div>
            <div class="stat-value">3M+</div>
          </div>

          <div
            class="stat md:w-full max-w-md place-self-center md:border border-none bg-primary rounded-sm"
          >
            <div class="stat-figure text-secondary indicator">
              <span
                class="indicator-item badge badge-secondary scale-50 animate-pulse"
              ></span>
              <Icon name="uil:user" class="w-8 h-8" />
            </div>
            <div class="stat-title">Active Users</div>
            <div class="stat-value">4,200</div>
          </div>
        </div>
        <LinkWithSound href="/register" class="w-full max-w-md inline z-10"
          ><Button type="accent" class="w-full mt-8"
            >Join the Fight</Button
          ></LinkWithSound
        >
      </div>
      <div
        class="text-info font-normal md:flex flex-col items-center justify-center pl-4 hidden relative"
        v-motion-fade
      >
        <div class="h-[80vh] w-[80vh] bubble-info place-self-center"></div>

        <div
          class="overflow-hidden group/letter bg-transparent outline-info outline-dashed outline-4 rounded-full animate-spin-super-slow-backwards p-16"
        >
          <div
            class="z-50 w-96 h-96 inline-grid overflow-clip rounded-3xl animate-spin-super-slow p-0"
          >
            <img
              v-for="id in imageIds"
              :src="`https://spellsword.up.railway.app/static/images/avatars/${id}.png`"
              class="opacity-100 transition-all ease-out object-cover hover:scale-105 rounded-full shadow-md shadow-secondary"
              style="grid-column: 1; grid-row: 1"
              :class="id != currentAvatar && 'invisible translate-x-96'"
            />
          </div>
        </div>
        <LetterBlock
          v-for="letter in letters"
          :letter="{ value: letter, id: letter, active: false }"
          :key="letter"
          :disabled="false"
          class="bg-primary border-info circle absolute shadow-info ease-in-out duration-300 hover:duration-500 group-hover/letter:duration-1000 stack z-50"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
const imageIds = Array(10)
  .fill(0)
  .map((_, idx) => idx + 1);
console.log(imageIds);
const currentAvatar = ref(1);
const download: Ref<null | HTMLElement> = ref(null);
// create an object with letter_1 as the keys and randomly generated numbers as each valuer
const letters = generateRandomSequence().map((letter) => letter.value);
console.log(letters);
const angle = ref(0);
const computeLetterCircles = (angle: number) => {
  if (!document) return; // stfu build error
  try {
    const circles = <HTMLUListElement[]>document.querySelectorAll(".circle");
    let dangle = 360 / circles.length;
    circles.forEach((circle, index) => {
      angle += dangle;
      circle.style.transform = `rotate(${angle}deg) translateX(${
        window.innerWidth / 5
      }px) rotate(-${angle}deg)`;
      if (Math.round(Math.random() * 100) == 1) {
        if (circle.classList.contains("shadow-2xl")) {
          circle.classList.remove("shadow-2xl", "shadow-accent");
        } else {
          circle.classList.add("shadow-2xl", "shadow-accent");
        }
      }
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

onMounted(() => computeLetterCircles(0));
setInterval(() => {
  angle.value += 1;
  computeLetterCircles(angle.value);
}, 100);

setInterval(() => {
  if (currentAvatar.value == imageIds.length) {
    currentAvatar.value = 1;
  } else {
    currentAvatar.value += 1;
  }
}, 2000);
</script>

<style>
.funny {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2377E4EEFF' stroke-width='3' stroke-dasharray='21' stroke-dashoffset='9' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 9999px;
}
</style>
