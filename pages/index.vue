<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <div>
    <div>test index</div>
    <div>{{ userStore.user }}</div>
  </div>
</template>

<style scoped></style>
