import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      token: "",
    };
  },
  getters: {
    authenticated: (state) => state.token !== "",
  },
  actions: {
    authenticate(jwt: string) {
      this.token = jwt;
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
