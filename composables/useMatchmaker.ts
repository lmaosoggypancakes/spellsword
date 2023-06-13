import { defineStore, acceptHMRUpdate } from "pinia";
import { Difficulty, GameConnectionStatus } from "~/types";

export const useMatchmakerStore = defineStore({
  id: "matchmaker",
  state: () => ({
    type: null as Difficulty | null,
    status: null as GameConnectionStatus.CONNECTING | null,
  }),
});
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMatchmakerStore, import.meta.hot));
