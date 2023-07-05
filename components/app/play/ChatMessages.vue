<template>
  <form class="relative grow" @submit.prevent="sendChatMessage()">
    <div
      class="chat"
      v-for="m in messages"
      :class="m.username == user.username ? 'chat-start' : 'chat-end'"
    >
      <div class="chat-bubble">{{ m.message }}</div>
    </div>
    <div class="flex grow absolute bottom-0">
      <input
        type="text"
        v-model="message"
        class="input w-full border-0 outline-none ring-0"
        placeholder="Say something..."
      />
      <Button type="secondary"
        ><Icon name="uil:arrow-right" class="h-8 w-8"
      /></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
const user = useUser();
const emits = defineEmits<{
  (e: "new_message", message: string): void;
}>();
defineProps<{ messages: any[] }>();
const message = ref("");
const sendChatMessage = () => {
  emits("new_message", message.value);
};
</script>
