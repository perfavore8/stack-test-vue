<template>
  <div class="main-layout">
    <div class="main-layout__header">
      <AppSearch v-model="searchText" />
      <button @click="() => (addModalOpened = true)">Добавить</button>
    </div>
    <AppTable
      :items="filteredItems"
      :headers="columns"
      v-model:options="options"
      @row-click="openEditModal"
    >
      <template #cell-delete="{ item }">
        <button class="delete-btn" @click.stop="handleDelete(item.id)">
          X
        </button>
      </template>
    </AppTable>
  </div>

  <AddEditOrganization
    v-if="addModalOpened"
    v-model="addModalOpened"
    @submit="handleAdd"
    mode="add"
  />
  <AddEditOrganization
    v-if="editModalOpened"
    v-model="editModalOpened"
    @submit="handleUpdate"
    mode="edit"
    :organization="editOrganization"
  />
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .main-layout__header {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .delete-btn {
    background-color: transparent;
    border: none;
  }
}
</style>

<script setup lang="ts">
import AppTable from './AppTable.vue';
import { computed, ref } from 'vue';
import type { Organization, SortField } from '../types/organization.ts';
import { formatAddress } from '../utils/formatAddress.ts';
import AppSearch from './AppSearch.vue';
import AddEditOrganization from './AddEditOrganization.vue';
import { useOrganizationsList } from '../composables/useOrganizationsList.ts';
import type { TableHeader, TableOptions } from '../types/table.ts';

const { items, handleDelete, handleAdd, handleUpdate } = useOrganizationsList();

const columns: TableHeader<Organization>[] = [
  { key: 'name', label: 'Название организации', sortable: true },
  { key: 'directorFullName', label: 'ФИО директора', sortable: true },
  { key: 'phone', label: 'Номер телефона' },
  {
    key: 'address',
    label: 'Адрес',
    formatter: (item: Organization) => formatAddress(item.address),
  },
  { key: 'delete', label: '' },
];

const options = ref<TableOptions<SortField>>({
  page: 1,
  itemsPerPage: 1,
  sortBy: null,
  sortDir: 'asc',
});

const sortedItems = computed(() => {
  const { sortBy, sortDir } = options.value;

  if (!sortBy) return items.value;

  return [...items.value].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;

    return sortDir === 'desc' ? -comparison : comparison;
  });
});

const addModalOpened = ref(false);
const editModalOpened = ref(false);
const editOrganization = ref<Organization>();
const openEditModal = (org: Organization) => {
  editOrganization.value = JSON.parse(JSON.stringify(org));
  editModalOpened.value = true;
};

const searchText = ref('');
const filteredItems = computed(() =>
  sortedItems.value.filter((org) =>
    org.directorFullName
      .toLowerCase()
      .includes(searchText.value.trim().toLowerCase()),
  ),
);
</script>
