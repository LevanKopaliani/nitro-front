<script setup lang="ts">
const userStore = useUserStore();

const Authtoken = useCookie("Authtoken");

const dropMenu = ref();
const searchText = ref("");

const toggle = (event: any) => {
  dropMenu.value.toggle(event);
};

function logOut() {
  Authtoken.value = null;
  navigateTo("/login");
}

const dropMenuItems = ref([
  {
    label: "Settings",
    icon: "pi pi-cog",
    command: () => console.log("settings"),
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => logOut(),
  },
]);

// const Authtoken =  useCookie("Authtoken");

// await $fetch("/api/settings", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     authorization: `Token ${userStore.token}`,
//   },
// }).then((response: any) => {
//   settingsData.value = response?.data;
// });

// async function handleSaveAction() {
//   console.log(settingsData.value);
//   const settings = await $fetch("/api/settings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Token ${userStore.token}`,
//     },
//     body: {
//       ...settingsData.value,
//     },
//   }).then((response: any) => {
//     settingsData.value = response?.data;
//   });
// }
</script>

<template>
  <div class="pb-3 border-b border-slate-200 flex justify-between">
    <div>
      <PrimeIconField>
        <PrimeInputIcon class="pi pi-search" />
        <PrimeInputText
          v-model="searchText"
          placeholder="Search"
          size="small"
        />
      </PrimeIconField>
    </div>
    <div class="cursor-pointer">
      <PrimeAvatar
        icon="pi pi-user"
        class="mr-2"
        size="normal"
        style="background-color: #ece9fc; color: #2a1261"
        aria-controls="overlay_menu"
        @click="toggle"
      />
      <PrimeMenu
        :model="dropMenuItems"
        ref="dropMenu"
        id="overlay_menu"
        :popup="true"
      >
      </PrimeMenu>
    </div>
  </div>
</template>

<style lang=""></style>
