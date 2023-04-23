import { defineStore } from "pinia";
import axios from "axios";
import { User } from "~~/types";
import { useUser } from "./useUser";

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
    async authenticate(jwt: string) {
      const userStore = useUser();
      const config = useRuntimeConfig();
      this.token = jwt;
      const response = await axios.get(`${config.public.apiUrl}/auth/hello`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const user: User = response.data;
      userStore.set(user);
    },
  },

  persist: {
    storage: persistedState.cookies,
  },
});
