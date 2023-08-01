<template>
  <div class="stats stats-vertical shadow max-w-sm uppercase">
    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 100 } }"
    >
      <div class="stat-title">Games Played</div>
      <div class="stat-value text-info">31K</div>
    </div>

    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 200 } }"
    >
      <div class="stat-title">W/L Ratio</div>
      <div class="stat-value text-accent">4.34w</div>
    </div>

    <div
      class="stat"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 300 } }"
    >
      <div class="stat-title">Friends</div>
      <div class="stat-value text-secondary">1,200</div>
    </div>
  </div>
</template>
