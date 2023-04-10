import { onMounted, onUnmounted } from "vue";

export function useKeydownEvent(handler: (event: KeyboardEvent) => void) {
  onMounted(() => document.addEventListener("keyup", handler));
  onUnmounted(() => document.removeEventListener("keyup", handler));
}
