<script setup lang="ts"></script>

<template>
  <div class="bg-bg-surface-50 flex gap-2 h-dvh">
    default
    <aside class="w-1/4 flex flex-col gap-3">
      <div class="p-5">logo place</div>
      <div class="py-6 px-4 flex flex-col">
        <div class="flex flex-col gap-2 flex-1">
          <template v-for="item in 5" :key="item.id">
            <div>{{ item }}. menu item</div>
          </template>
        </div>
        <div>
          <p>help</p>
          <p>settings</p>
        </div>
      </div>
    </aside>
    <main class="">data</main>
    <slot />
  </div>
</template>

<style scoped></style>
