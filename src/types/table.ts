import type { SortDirection } from './organization.ts';

export interface TableHeader<T extends TableItem> {
  key: string;
  label: string;
  sortable?: boolean;
  formatter?: (value: T) => string | number;
}

export interface TableItem {
  id: string;
  [key: string]: unknown;
}
export interface TableOptions<SortFields extends string = string> {
  page: number;
  itemsPerPage: number;
  sortBy: SortFields | null;
  sortDir: SortDirection;
}
