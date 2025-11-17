<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal">
        <h2>
          {{
            mode === 'add'
              ? 'Добавить организацию'
              : 'Редактировать организацию'
          }}
        </h2>

        <form @submit.prevent="handleSubmit" class="form">
          <label>
            <span>Название *</span>
            <input v-model="form.name" type="text" required />
          </label>

          <label>
            <span>ФИО директора *</span>
            <input v-model="form.directorFullName" type="text" required />
          </label>

          <label>
            <span>Номер телефона *</span>
            <input v-model="form.phone" type="tel" required />
          </label>

          <fieldset>
            <legend>Адрес *</legend>
            <label>
              <span>Город *</span>
              <input v-model="form.address.city" type="text" required />
            </label>
            <label>
              <span>Улица *</span>
              <input v-model="form.address.street" type="text" required />
            </label>
            <label>
              <span>Дом *</span>
              <input v-model="form.address.house" type="text" required />
            </label>
          </fieldset>

          <div class="form-actions">
            <button type="button" @click="close" class="btn-cancel">
              Отмена
            </button>
            <button type="submit" :disabled="!isValid" class="btn-submit">
              {{ mode === 'add' ? 'Добавить' : 'Сохранить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Organization } from '../types/organization.ts';

const props = defineProps<{
  mode: 'add' | 'edit';
  organization?: Organization;
}>();

const emit = defineEmits<{
  submit: [Organization];
}>();

const modelValue = defineModel<boolean>();

if (props.mode === 'edit' && !props.organization) {
  throw new Error('Prop "organization" is required in edit mode');
}

const form = ref<Organization>(
  props.mode === 'edit'
    ? props.organization!
    : {
        id: '',
        name: '',
        directorFullName: '',
        phone: '',
        address: {
          city: '',
          street: '',
          house: '',
        },
      },
);

const isValid = computed(() => {
  const { name, directorFullName, phone, address } = form.value;
  return (
    name.trim() !== '' &&
    directorFullName.trim() !== '' &&
    phone.trim() !== '' &&
    address.city.trim() !== '' &&
    address.street.trim() !== '' &&
    address.house.trim() !== ''
  );
});

const close = () => {
  modelValue.value = false;
};

watch(modelValue, (isOpen) => {
  if (!isOpen) {
    form.value = {
      id: '',
      name: '',
      directorFullName: '',
      phone: '',
      address: { city: '', street: '', house: '' },
    };
  }
});

const handleSubmit = () => {
  if (!isValid.value) return;

  const payload: Organization = {
    id: form.value.id.trim(),
    name: form.value.name.trim(),
    directorFullName: form.value.directorFullName.trim(),
    phone: form.value.phone.trim(),
    address: {
      city: form.value.address.city.trim(),
      street: form.value.address.street.trim(),
      house: form.value.address.house.trim(),
    },
  };

  emit('submit', payload);
  close();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #1e1e1e;
  color: #e0e0e0;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

label,
fieldset {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label span,
fieldset legend {
  font-weight: 600;
  font-size: 14px;
}

input {
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background: #2a2a2a;
  color: #fff;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007acc;
}

fieldset {
  border: 1px solid #444;
  border-radius: 6px;
  padding: 16px;
  margin: 0;
}

fieldset legend {
  padding: 0 8px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-cancel,
.btn-submit {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: #3a3a3a;
  color: #ccc;
}

.btn-cancel:hover:not(:disabled) {
  background: #4a4a4a;
}

.btn-submit {
  background: #007acc;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #0066b3;
}

.btn-cancel:disabled,
.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
