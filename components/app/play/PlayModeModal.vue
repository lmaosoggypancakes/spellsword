<template>
  <dialog
    class="modal rounded-xl z-50 modal-bottom sm:modal-middle"
    id="play_mode_modal"
  >
    <form
      method="dialog"
      class="modal-box flex flex-col justify-center space-y-8"
      @click="matchmaker.open = false"
    >
      <component
        v-for="mode in modes"
        :is="mode"
        class="modal-action"
      ></component>
    </form>
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
}>();
const modes = [CasualCard, AdventureCard, MasterCard, ComputerCard];
</script>
