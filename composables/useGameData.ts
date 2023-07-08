import { defineStore } from "pinia";
import { Difficulty, GameConnectionStatus } from "~/types";

export default defineStore("game_data", {
  state: () => {
    return {
      type: null as Difficulty | null,
      status: null as GameConnectionStatus | null,
    };
  },
});
