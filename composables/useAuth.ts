import { defineStore } from "pinia";
import axios from "axios";
import { User } from "~~/types";
import { useUser } from "./useUser";

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      token: "", // default is empty string to convey the idea of unauthenticated users
    };
  },
  getters: {
    authenticated: (state) => state.token !== "", // useAuth().authenticated will be false if the user is not logged in (no JWT token is set, or it's empty)
  },
  actions: {
    async authenticate(jwt: string) {
      const userStore = useUser();
      const config = useRuntimeConfig();
      this.token = jwt;
      // /auth/hello is an API endpoint that returns the logged in user.
      const response = await axios.get(`${config.public.apiUrl}/auth/hello`, {
        headers: {
          Authorization: `Bearer ${jwt}`, // without this, the server would return HTTP 401 (Unauthorized)
        },
      });
      const user: User = response.data; // cast the response data to type User. if errors occur in casting, they will happen here.
      userStore.set(user);
    },
  },

  persist: {
    storage: persistedState.cookies,
  },
});
