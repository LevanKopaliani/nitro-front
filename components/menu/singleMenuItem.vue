<script setup lang="ts">
import type { MenuItem } from "~/types/Menus";

defineProps<{
  menuItem: MenuItem;
  hasSubmenu: boolean;
  active: boolean;
}>();

const emit = defineEmits(["deleteMenu", "addMenuChild", "editMenu"]);

function handleAddMenu(item: MenuItem) {
  emit("addMenuChild", item);
}
function handleEditMenu(item: MenuItem) {
  emit("editMenu", item);
}
function handleDeleteMenu(item: MenuItem) {
  emit("deleteMenu", item);
}
//
</script>

<template>
  <div
    class="px-4 flex gap-3 justify-between items-center group w-full border-slate-200 rounded-lg border py-1"
    v-ripple
  >
    <div class="flex gap-3 items-center">
      <i
        v-if="hasSubmenu"
        class="pi pi-angle-right duration-150 transition-transform"
        :class="[{ 'rotate-90': active }]"
      ></i>
      <p>{{ menuItem.title }}</p>
    </div>

    <div class="border border-slate-100 rounded-lg p-2 flex gap-2">
      <PrimeButton
        icon="pi pi-plus"
        style="font-size: 1rem"
        aria-label="add"
        size="small"
        @click="handleAddMenu(menuItem)"
      />
      <PrimeButton
        icon="pi pi-pencil"
        style="font-size: 1rem"
        aria-label="edit"
        severity="secondary"
        size="small"
        @click="handleEditMenu(menuItem)"
      />
      <PrimeButton
        icon="pi pi-trash"
        style="font-size: 1rem"
        aria-label="delete"
        severity="danger"
        size="small"
        @click="handleDeleteMenu(menuItem)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
