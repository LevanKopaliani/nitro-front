<script setup lang="ts">
import type { Menus } from "~/types/Menus";
const userStore = useUserStore();

const drawerVisible = ref(false);

const data = reactive({
  title: null,
  menu_type: null,
  slug: null,
  // configs: [],
});
function closeDrawer() {
  drawerVisible.value = false;
  data.title = null;
  data.menu_type = null;
  data.slug = null;
}

async function addMenu() {
  const menu = await $fetch("api/menus/addMenu", {
    method: "POST",
    headers: {
      authorization: `Token ${userStore.token}`,
    },
    body: {
      ...data,
    },
  });
}

console.log("token--------------------------------", userStore.token);

const menusData = await $fetch("api/menus/getMenus", {
  method: "POST",
  headers: {
    authorization: `Token ${userStore.token}`,
  },
});
</script>

<template>
  <div>
    <div class="pb-4">
      <p>add menu item</p>
      <PrimeButton icon="pi pi-arrow-right" @click="drawerVisible = true" />
    </div>
    <div>
      <p>menu container</p>
      <div>{{ menusData }}</div>
    </div>
    <div class="card flex justify-center">
      <PrimeDrawer
        v-model:visible="drawerVisible"
        header="Add Menu"
        position="right"
        class="!w-1/2"
      >
        <div class="py-2">
          <PrimeFloatLabel variant="on">
            <PrimeInputText
              id="on_label"
              v-model="data.title"
              autocomplete="off"
            />
            <label for="on_label">title</label>
          </PrimeFloatLabel>
          <PrimeFloatLabel variant="on">
            <PrimeInputText
              id="on_label"
              v-model="data.menu_type"
              autocomplete="off"
            />
            <label for="on_label">menu type</label>
          </PrimeFloatLabel>
          <PrimeFloatLabel variant="on">
            <PrimeInputText
              id="on_label"
              v-model="data.slug"
              autocomplete="off"
            />
            <label for="on_label">slug</label>
          </PrimeFloatLabel>
        </div>
        <template #footer>
          <div class="flex items-center gap-2">
            <PrimeButton
              label="save"
              icon="pi pi-save"
              class="flex-auto"
              outlined
              @click="addMenu"
            ></PrimeButton>
            <PrimeButton
              label="cancel"
              icon="pi pi-undo"
              class="flex-auto"
              severity="danger"
              text
              @click="closeDrawer"
            ></PrimeButton>
          </div>
        </template>
      </PrimeDrawer>
    </div>
  </div>
</template>

<style lang=""></style>
