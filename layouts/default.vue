<script setup lang="ts"></script>

<template>
  <div class="bg-slate-50 flex gap-2 h-dvh">
    <aside class="w-1/3 flex flex-col gap-3 p-4">
      <div class="p-4 border-b border-slate-200">logo place</div>
      <div class="flex flex-col h-full">
        <div class="flex flex-col gap-2 flex-1">
          <nuxt-link to="/" active class="menu__item">
            <span class="pi pi-home"></span><span>Dashboard</span>
          </nuxt-link>
          <nuxt-link to="/menus" class="menu__item">
            <span class="pi pi-tags"></span><span>Menus</span>
          </nuxt-link>
          <nuxt-link to="/users" class="menu__item">
            <span class="pi pi-users"></span><span>Users</span>
          </nuxt-link>
          <nuxt-link to="/translations" class="menu__item">
            <span class="pi pi-language"></span><span>Translations</span>
          </nuxt-link>
          <nuxt-link to="/messages" class="menu__item">
            <span class="pi pi-inbox"></span><span>Messages</span>
          </nuxt-link>
          <nuxt-link to="/taxonomies" class="menu__item">
            <span class="pi pi-objects-column"></span><span>Taxonomies</span>
          </nuxt-link>
          <nuxt-link to="/widgets" class="menu__item">
            <span class="pi pi-th-large"></span><span>Widgets</span>
          </nuxt-link>
          <nuxt-link to="/content" class="menu__item">
            <span class="pi pi-list"></span><span>Contet</span>
          </nuxt-link>
        </div>
        <div>
          <p class="menu__item">
            <span class="pi pi-question-circle"></span><span>help</span>
          </p>
          <p class="menu__item">
            <span class="pi pi-cog"></span><span>settings</span>
          </p>
        </div>
      </div>
    </aside>
    <main class="py-2 w-full pr-2">
      <div
        class="bg-white border rounded-2xl border-slate-200 p-4 flex flex-col gap-6 h-full"
      >
        <div class="pb-4 border-b border-slate-200">heading</div>
        <div><slot /></div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
