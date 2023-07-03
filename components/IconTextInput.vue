<template>
  <div class="inline-flex flex-row items-center">
    <Icon
      name="mdi:account"
      class="h-14 w-14 rounded-tl-md rounded-bl-md bg-secondary text-primary p-4"
    />
    <input
      type="text"
      placeholder="Username"
      class="h-14 bg-primary border-2 border-secondary rounded-tr-md rounded-br-md outline-none pl-4"
      v-model="username"
    />
  </div>
</template>
