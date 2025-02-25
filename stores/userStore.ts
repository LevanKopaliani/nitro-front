import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
    exp: null,
  }),
  actions: {
    async getUserData(token: string) {
      // this.token = token;
      console.log("gaiara");
      const response = await $fetch("/api/auth/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${token}`,
        },
      });
      if (response?.success) {
        this.user = response.user;
        this.token = response.token;
      }
    },
  },
});
