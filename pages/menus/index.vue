<script setup lang="ts">
import type { MenuItem } from "~/types/Menus";

const menuStore = useMenuStore();
menuStore.getMenuData();
const { menuWithTypes } = storeToRefs(menuStore);

const menuTypes = computed<string[]>(() => Object.keys(menuWithTypes.value));

const drawerVisible = ref(false);
const actionType = ref<string | null>(null);

const data: any = reactive({
  title: "",
  menu_type: "",
  slug: "",
  pid: 0,
  // configs: [],
});

function closeDrawer() {
  drawerVisible.value = false;
  actionType.value = null;
  data.title = "";
  data.menu_type = "";
  data.slug = "";
  data.pid = 0;
  if (data?.id) {
    delete data.id;
  }
}

function addMenuType() {
  actionType.value = "POST";
  drawerVisible.value = true;
}
function addMenuChild(item: MenuItem) {
  data.menu_type = item.menu_type;
  data.pid = item.id!;
  actionType.value = "POST";
  drawerVisible.value = true;
}
function editMenu(item: MenuItem) {
  data.id = item.id;
  //
  data.title = item.title;
  data.menu_type = item.menu_type;
  data.slug = item.slug;
  actionType.value = "PATCH";
  drawerVisible.value = true;
}
function deleteMenu(item: MenuItem) {
  menuStore.deleteMenu(item);
}

function handleSaveAction() {
  if (actionType.value === "POST") {
    menuStore.addMenu(data);
  } else if (actionType.value === "PATCH") {
    menuStore.patchMenu(data);
  }
  setTimeout(() => {
    closeDrawer();
  }, 300);
}
</script>

<template>
  <div>
    <PrimeTabs :value="menuTypes?.[0]">
      <PrimeTabList>
        <PrimeTab v-for="tab in menuTypes" :key="tab" :value="tab">{{
          tab
        }}</PrimeTab>
        <PrimeTab value="addItem" as="div">
          <PrimeButton
            icon="pi pi-plus"
            iconPos="right"
            style="font-size: 1rem"
            label="Add Menu"
            aria-label="Add Menu"
            variant="outlined"
            size="small"
            @click="addMenuType"
          />
        </PrimeTab>
      </PrimeTabList>

      <PrimeTabPanels class="!px-0 !border-none">
        <PrimeTabPanel
          v-for="menuContent in menuTypes"
          :key="menuContent"
          :value="menuContent"
          class="flex flex-col gap-3"
        >
          <PrimePanelMenu
            :model="menuWithTypes?.[menuContent]"
            multiple
            :pt="{
              panel: { class: '!border-none' },
            }"
          >
            <template #item="{ item, hasSubmenu, active }">
              <div class="flex items-center cursor-pointer w-full mb-2">
                <SingleMenuItem
                  :menu-item="item as MenuItem"
                  :has-submenu="hasSubmenu"
                  :active="active"
                  @add-menu-child="addMenuChild"
                  @edit-menu="editMenu"
                  @delete-menu="deleteMenu"
                />
              </div>
            </template>
          </PrimePanelMenu>
        </PrimeTabPanel>
      </PrimeTabPanels>
    </PrimeTabs>
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
              @click="handleSaveAction"
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
