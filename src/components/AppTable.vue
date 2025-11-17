<template>
  <table class="data-table">
    <thead>
      <tr>
        <th
          v-for="field in headers"
          :key="field.key"
          :class="{ 'data-table__th-sortable': field.sortable }"
          @click="handleToggleSortAction(field)"
        >
          {{ field.label }}
          <template v-if="options.sortBy === field.key">
            <span class="icon" v-if="options.sortDir === 'asc'">↓</span>
            <span class="icon" v-if="options.sortDir === 'desc'">↑</span>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in slicedItems"
        :key="item.id"
        @click="$emit('rowClick', item)"
      >
        <td v-for="header in headers" :key="header.key">
          <slot :name="`cell-${header.key}`" :header="header" :item="item">
            {{ header.formatter ? header.formatter(item) : item[header.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="pagesCount > 1">
      <tr>
        <td :colspan="headers.length">
          <div class="data-table__footer-content">
            <button
              class="icon-btn"
              :disabled="options.page === 1"
              @click="handlePreviousPageAction"
            >
              <
            </button>
            {{ options.page }} / {{ pagesCount }}
            <button
              class="icon-btn"
              :disabled="options.page >= pagesCount"
              @click="handleNextPageAction"
            >
              >
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
td {
  text-align: start;
}

th,
td {
  padding: 4px;
  padding-left: 12px;
}
.data-table__footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 20px;

  .icon-btn {
    padding: 8px 16px;
    line-height: 1;
  }
}
</style>

<script setup lang="ts" generic="T extends TableItem">
import { computed } from 'vue';
import type { TableHeader, TableItem, TableOptions } from '../types/table.ts';

interface Props {
  items: T[];
  headers: TableHeader<T>[];
}

const props = defineProps<Props>();

defineEmits<{
  rowClick: [T];
}>();

const options = defineModel<TableOptions>('options', { required: true });

const pagesCount = computed(
  () => props.items.length / options.value.itemsPerPage,
);
const handlePreviousPageAction = () => options.value.page--;
const handleNextPageAction = () => options.value.page++;

const slicedItems = computed(() =>
  props.items.slice(
    (options.value.page - 1) * options.value.itemsPerPage,
    options.value.page * options.value.itemsPerPage,
  ),
);

function handleToggleSortAction(filed: TableHeader<T>) {
  if (!filed.sortable) return;

  const filedName = filed.key;
  if (options.value.sortBy === filedName) {
    if (options.value.sortDir === 'asc') options.value.sortDir = 'desc';
    else options.value.sortBy = '';
  } else {
    options.value.sortBy = filedName;
    options.value.sortDir = 'asc';
  }
}
</script>
