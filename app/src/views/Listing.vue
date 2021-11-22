<script setup lang="ts">
import { schemaStore } from 'src/store/schema';
import { FButton } from 'furikaeru';
import { randomId } from 'src/utils';
import { KataSchema } from 'src/types';

const SCHEMA_BASE: KataSchema = {
  header: {
    component: 'kata-header',
    children: [],
    parent: true,
    id: randomId(),
    config: {
      justify: 'between',
    },
  },
};

const emits = defineEmits<{
  (e: 'select-schema', id: string): void;
}>();

let newSchemaName = $ref('');

function handleCreateSchema() {
  if (!newSchemaName) return;

  if (schemaStore.value.has(newSchemaName)) return;

  schemaStore.value.set(newSchemaName, SCHEMA_BASE);

  emits('select-schema', newSchemaName);
}

function handleShcemaRemoval(id: string) {
  schemaStore.value.delete(id);
}
</script>
<template>
  <div>
    <div class="flex justify-end space-x-3">
      <input
        type="text"
        class="
          rounded-md
          border border-lime-200
          py-1
          shadow-none
          bg-lime-50
          focus:(shadow-none
          border-lime-400)
          transition-colors
        "
        placeholder="New schema title"
        @keyup.enter="handleCreateSchema"
        v-model="newSchemaName"
      />
      <f-button
        label="Create"
        sm
        color="lime"
        @click="handleCreateSchema"
        :disabled="!newSchemaName"
        :class="{ 'cursor-not-allowed': !newSchemaName }"
      />
    </div>

    <div class="text-lg">My schemas</div>

    <div class="grid sm:grid-cols-5 grid-cols-1 gap-2 mt-4">
      <div
        v-for="[key] in schemaStore.entries()"
        class="
          py-1
          px-2
          bg-lime-100
          hover:bg-lime-200
          border border-lime-500
          rounded-md
          flex
          items-center
          justify-between
        "
      >
        <div>
          {{ key }}
        </div>
        <div class="flex justify-end items-center space-x-3">
          <f-button icon="mdi:eye-outline" color="lime" sm @click="$emit('select-schema', key)" size="17px" />

          <f-button icon="mdi:trash-can-outline" color="lime" sm @click="handleShcemaRemoval(key)" size="17px" />
        </div>
      </div>
    </div>
  </div>
</template>
