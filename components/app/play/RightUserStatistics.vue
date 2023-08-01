<template>
  <div class="stats stats-vertical shadow max-w-sm uppercase">
    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 400 } }"
    >
      <div class="stat-title">Account Created</div>
      <div class="stat-value text-info">1/1/1999</div>
    </div>

    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 500 } }"
    >
      <div class="stat-title">Rank</div>
      <div class="stat-value text-accent">Radiant</div>
    </div>

    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 600 } }"
    >
      <div class="stat-title">Friends</div>
      <div class="stat-value text-secondary">1,200</div>
    </div>
  </div>
</template>
