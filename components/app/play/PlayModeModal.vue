<template>
  <dialog
    class="modal rounded-xl space-y-4 flex flex-col justify-center w-full z-50 bg-secondary"
    id="play_mode_modal"
  >
    <component
      v-for="mode in modes"
      :is="mode"
      @play="(e: Difficulty) => emits('matchmake', e)"
    ></component>
  </dialog>
</template>

<script setup lang="ts">
import CasualCard from "./cards/CasualCard.vue";
import AdventureCard from "./cards/AdventureCard.vue";
import MasterCard from "./cards/MasterCard.vue";
import ComputerCard from "./cards/ComputerCard.vue";
import { Difficulty } from "~/types";

const router = useRouter();
const matchmaker = useMatchmaker();
const props = defineProps<{
  disabled?: boolean;
  open: boolean;
}>();
const modes = [CasualCard, AdventureCard, MasterCard, ComputerCard];
matchmaker.$subscribe((_, val) => {
  if (val.type === Difficulty.COMPUTER) {
    router.push("/app/play/computer");
  } else {
    emits("matchmake", val.type);
  }
});
const emits = defineEmits(["matchmake"]);
watch(props, (val) => {
  if (val) {
    setTimeout(() => {
      const modal = document.getElementById("play_mode_modal");
      if (modal && val.open) {
        modal.showModal();
      }
    }, 100);
  }
});
</script>
