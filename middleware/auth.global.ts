import { useUserStore } from "#imports";
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  if (import.meta.client) {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // if token expired
        if (decodedToken?.exp! < currentTime) {
          localStorage.removeItem("token");
          return navigateTo("/login");
        }
        // get user Data
        if (!userStore.user) {
          userStore.getUserData(token);
        }
      } catch (error) {
        // Handle token decoding error
        localStorage.removeItem("token");
        return navigateTo("/login");
      }
    } else if (to.name !== "login") {
      return navigateTo("/login");
    }
  }
});
