<template>
  <input
    class="search"
    type="text"
    placeholder="Найти по ФИО..."
    v-model="value"
  />
</template>

<script setup lang="ts">
const value = defineModel<string>({ required: true });
</script>

<style scoped>
.search {
  padding: 12px;
  border-radius: 8px;
  border: none;
}
</style>
