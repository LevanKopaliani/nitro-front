import { defineStore } from "pinia";
import type { MenuItem } from "~/types/Menus";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: [] as MenuItem[],
    menu_types: [],
  }),
  actions: {
    async getMenuData() {
      const userStore = useUserStore();

      const response = await $fetch("/api/menus", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${userStore.token}`,
        },
      });
      if (response?.success) {
        this.menu = response?.data;
      }
    },
    async addMenu(menuItem: MenuItem) {
      const userStore = useUserStore();

      const menu = await $fetch("/api/menus", {
        method: "POST",
        headers: {
          authorization: `Token ${userStore.token}`,
        },
        body: {
          ...menuItem,
        },
      });
      if (menu?.success) {
        this.getMenuData();
        return menu;
      }
    },
    async patchMenu(menuItem: MenuItem) {
      const userStore = useUserStore();

      const menu = await $fetch("/api/menus", {
        method: "PATCH",
        headers: {
          authorization: `Token ${userStore.token}`,
        },
        body: {
          ...menuItem,
        },
      });
      if (menu?.success) {
        this.getMenuData();
        return menu;
      }
    },
    async deleteMenu(menuItem: MenuItem) {
      const userStore = useUserStore();

      const menu = await $fetch(`/api/menus/${menuItem.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Token ${userStore.token}`,
        },
      });
      if (menu?.success) {
        this.getMenuData();
        return menu;
      }
    },
  },
  getters: {
    // menuTypes(state) {
    //   const temp: string[] = [];

    //   state.menu?.forEach((element: MenuItem) => {
    //     if (!temp.includes(element?.menu_type)) {
    //       temp.push(element.menu_type);
    //     }
    //   });

    //   return temp;
    // },
    menuWithTypes(state) {
      const temp: any = {};

      state.menu?.forEach((element: any) => {
        element["items"] = [];
        if (!(element?.menu_type in temp)) {
          temp[element?.menu_type] = [];
        }

        if (element.pid != 0) {
          const parrentIndex = state.menu?.findIndex(
            (el: any) => el.id == element.pid
          );
          state.menu?.[parrentIndex]?.items?.push(element);
        } else {
          temp?.[element?.menu_type]?.push(element);
        }
      });

      return temp;
    },
  },
});
