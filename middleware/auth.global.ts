import { useUserStore } from "#imports";
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const Authtoken = useCookie("Authtoken");
  if (Authtoken.value) {
    try {
      console.log("Authtoken----------------------------", Authtoken.value);
      const decodedToken = jwtDecode(Authtoken.value);
      const currentTime = Date.now() / 1000;

      if (decodedToken?.exp! < currentTime) {
        // localStorage.removeItem("token");
        Authtoken.value = null;
        return navigateTo("/login");
      }

      if (!userStore.user) {
        userStore.token = Authtoken.value;
        await userStore.getUserData(Authtoken.value);
      }
    } catch (error) {
      // return navigateTo("/login");
    }
  } else if (to.name !== "login") {
    return navigateTo("/login");
  }
  // if (import.meta.client) {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       const currentTime = Date.now() / 1000;

  //       // if token expired
  //       if (decodedToken?.exp! < currentTime) {
  //         localStorage.removeItem("token");
  //         return navigateTo("/login");
  //       }
  //       // get user Data
  //       if (!userStore.user) {
  //         await userStore.getUserData(token);
  //       }
  //     } catch (error) {
  //       // Handle token decoding error
  //       localStorage.removeItem("token");
  //       return navigateTo("/login");
  //     }
  //   } else if (to.name !== "login") {
  //     return navigateTo("/login");
  //   }
  // }
});
