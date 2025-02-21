<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <div>test index</div>
  <div>{{ userStore.user }}</div>
</template>

<style scoped></style>
