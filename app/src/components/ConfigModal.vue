<script setup lang="ts">
import { FModal, FMenu, FButton } from 'furikaeru';
import { CombinedComponentConfig } from 'kata';
import { CombinedConfig, componentNames } from 'src/types';
import config from 'src/utils/config.json';

import { watch } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  component: componentNames;
  configTypes: (keyof CombinedComponentConfig)[];
  previousConfig?: CombinedConfig;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
  (e: 'config', val: CombinedConfig): void;
}>();

let isModal = $computed<boolean>({
  get: () => props.modelValue as boolean,
  set: (val) => emits('update:modelValue', val),
});

let configOptions = $computed(() =>
  props.configTypes.reduce<{ [K in keyof CombinedComponentConfig]: { label: string; value: string }[] }>(
    (hash, current) => {
      hash[current] = config[current].map((e) => ({ label: e, value: e }));
      return hash;
    },
    {},
  ),
);

let configModels = $ref<CombinedConfig>({});

watch(
  () => props.modelValue,
  (val) => {
    if (val === true && !!props.previousConfig) {
      configModels = { ...props.previousConfig };
    }
  },
);

function emitConfig() {
  if (!Object.keys(configModels).length) return;

  emits('config', configModels);
  configModels = {};

  emits('update:modelValue', false);
}
</script>
<template>
  <f-modal :title="'Settings'" width="300px" title-size="20px" v-model="isModal" @close="emitConfig">
    <div slot="body">
      <div class="flex flex-col space-y-3">
        <div v-for="[name, config] in Object.entries(configOptions)" class="flex justify-between items-center">
          <div>{{ configModels[name] || '-' }}</div>
          <f-menu
            :options="config"
            option-key="value"
            :key="name"
            v-model="configModels[name]"
            :label="name"
            color="lime"
            sm
          />
        </div>
      </div>

      <div class="flex justify-end mt-5">
        <f-button @click="emitConfig" label="Apply" sm color="lime" :disabled="!Object.keys(configModels).length" />
      </div>
    </div>
  </f-modal>
</template>
