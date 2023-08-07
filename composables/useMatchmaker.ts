import { defineStore } from "pinia";
import { Difficulty, GameConnectionStatus } from "~/types";

export default defineStore("matchmaker", {
  state: () => {
    return {
      type: null as Difficulty | null,
      status: null as GameConnectionStatus | null,
      open: false,
      ready: false,
      matchmaking: false,
    };
  },
  actions: {
    toggleOpen() {
      this.open = !this.open;
      const modal: any = document.getElementById("play_mode_modal");
      if (modal) {
        if (this.open) modal.showModal();
        else modal.close();
      }
    },
  },
});
