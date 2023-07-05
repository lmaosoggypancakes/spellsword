<template>
  <div
    class="border-x-2 border-secondary h-full hidden lg:flex lg:flex-col col-span-1"
  >
    <div class="tabs flex justify-between">
      <a
        class="tab tab-md w-1/2 tab-bordered"
        :class="
          onMoves ? 'tab-active bg-secondary text-primary' : 'text-secondary'
        "
        @click="onMoves = true"
        >Moves</a
      >
      <a
        class="tab tab-md w-1/2 tab-bordered"
        :class="
          !onMoves ? 'tab-active bg-secondary text-primary' : 'text-secondary'
        "
        @click="onMoves = false"
      >
        Chat
        <div
          class="badge badge-xs p-2 hidden lg:inline-flex ml-2"
          :class="!onMoves ? 'badge-primary' : 'badge-secondary '"
        >
          +1
        </div>
      </a>
    </div>
    <ChatMessages
      :messages="messages"
      v-show="!onMoves"
      @new_message="(m) => $emit('new_message', m)"
    />
    <ul v-show="onMoves">
      <MoveCard
        :move="move"
        v-for="move in moves"
        :opponent="move.userId !== userStore.id"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Move } from "types";

const emits = defineEmits<{
  (e: "new_message", message: string): void;
}>();
const onMoves = ref(true);
const userStore = useUser();

defineProps<{
  moves: Move[];
  messages: any[];
}>();
</script>
