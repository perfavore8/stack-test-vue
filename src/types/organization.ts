import type { TableItem } from './table.ts';

export interface Address {
  city: string;
  street: string;
  house: string;
}

export interface Organization extends TableItem {
  id: string;
  name: string;
  directorFullName: string;
  phone: string;
  address: Address;
}

export type SortField = 'name' | 'directorFullName';
export type SortDirection = 'asc' | 'desc';
