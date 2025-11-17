import { ref } from 'vue';
import type { Organization } from '../types/organization.ts';

export function useOrganizationsList() {
  const items = ref<Organization[]>([
    {
      id: '1',
      name: 'ООО "Вектор"',
      directorFullName: 'Иванов И.И.',
      phone: '+7 000 123 45 67',
      address: { city: 'Москва', street: 'Ленина', house: '1' },
    },
    {
      id: '2',
      name: 'ИП Сидоров С.С.',
      directorFullName: 'Сидоров С.С.',
      phone: '+7 000 56 78 99',
      address: { city: 'Санкт-Петербург', street: 'Невский', house: '2' },
    },
  ]);

  const handleDelete = (id: Organization['id']) => {
    items.value = items.value.filter((org) => org.id !== id);
  };

  const handleAdd = (org: Organization) => {
    items.value.push(org);
  };

  const handleUpdate = (org: Organization) => {
    const idx = items.value.findIndex((item) => item.id === org.id);
    if (idx === -1) return;
    items.value[idx] = org;
  };

  return { items, handleDelete, handleAdd, handleUpdate };
}
