import { defineStore } from "pinia";
import { User } from "~~/types";

export const useUser = defineStore(
  "user",

  () => {
    const id = ref("");
    const picture = ref("");
    const created = ref(new Date());
    const email = ref("");
    const followedBy = ref([]);
    const following = ref([]);
    const username = ref("");
    const set = (newUser: User) => {
      id.value = newUser.id;
      picture.value = newUser.picture;
      created.value = newUser.created;
      username.value = newUser.username;
      email.value = newUser.email;
    };
    return {
      id,
      picture,
      created,
      email,
      followedBy,
      following,
      username,
      set,
    };
  },
  {
    persist: {
      storage: persistedState.cookies,
    },
  }
);
