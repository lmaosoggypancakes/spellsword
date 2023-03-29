import { defineStore } from "pinia";
import axios from "axios";
import { User } from "~~/types";
import { useUser } from "./useUser";

const userStore = useUser();
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
      this.token = jwt;
      const response = await axios.get(
        "https://spellsword.up.railway.app/api/hello",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const user: User = response.data;
      userStore.set(user);
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
