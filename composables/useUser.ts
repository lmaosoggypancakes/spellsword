import { defineStore } from "pinia";
import { User } from "~~/types";

export const useUser = defineStore("user", {
  state(): User {
    return {
      id: "",
      picture: "",
      created: new Date(),
      email: "",
      followedBy: [],
      following: [],
      username: "",
    };
  },
  getters: {
    user: (state) => state,
  },
  actions: {
    set(user: User) {
      Object.assign(this.user, user);
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
