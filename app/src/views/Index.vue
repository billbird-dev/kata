<script setup lang="ts">
import {
  AcceptedComponents,
  Block,
  CombinedConfig,
  componentNames,
  InvoiceSchema,
  Section,
  SectionName,
} from 'src/types';
import TreeNode from 'src/components/TreeNode.vue';
import { randomId } from 'src/utils';
import { FMenu } from 'furikaeru';
import { ref } from 'vue';
import KAction from 'src/components/KAction.vue';
import ConfigModal from 'src/components/ConfigModal.vue';
import { CombinedComponentConfig } from 'kata';

let schema = ref<{ [x in SectionName]?: Block }>({
  header: {
    component: 'kata-header',
    children: [],
    parent: true,
    id: randomId(),
    config: {
      justify: 'between',
    },
  },
});

/**
Kata schema
[] -> {}
section -> header
  - name
  - css classes
  - max blocks -> number
  - accepted component types -> {}
    - name
      - config opts @type {CombinedConfig}

*/

const INVOICE_SCHEMA: InvoiceSchema = {
  header: {
    name: 'header',
    components: {
      'header-info': ['space', 'align', 'flex', 'justify', 'space'],
      'header-logo': ['align', 'flex', 'justify'],
    },
    max: 2,
  },
};

const COMPONENT_PROPS: { [C in componentNames]: Record<string, string | number | { [x: string]: any }> } = {
  'header-info': {
    data: {
      name: 'Bangali Traders',
      address: 'Home',
      branch: 'BBSR',
      gstin: 'ssss',
      phone: '988989989',
    },
  },
  'header-logo': {
    imgSrc: 'https://sambitsahoo.com/vue-opinions.png',
    alt: 'Logo',
  },
  'kata-header': {},
};

let loopableSchema = $computed(() => Object.entries(INVOICE_SCHEMA) as any as [SectionName, Section][]);

function trasformComponentsToOptions(components: AcceptedComponents, sectionEls: Block[]) {
  return Object.keys(components)
    .map((key) => ({ label: key, value: key }))
    .filter((e) => !sectionEls.some((el) => el.component === e.label));
}

let model = $ref('');

function handleAddElement(element: string | number, sectionId: SectionName) {
  element = element as componentNames;

  const section = schema.value[sectionId];

  console.log(section);

  if (!section) return;

  const slots = section.children.length;
  const max = INVOICE_SCHEMA[sectionId]?.max || 0;

  if (slots > 0 && max - slots === 0) return;

  const newEl: Block = {
    component: element as componentNames,
    props: {
      ...COMPONENT_PROPS[element as componentNames],
    },
    id: randomId(),
    children: [],
    parent: false,
  };

  schema.value[sectionId]?.children.push(newEl);
}

function handleRemoveEl(id: string, sectionId: SectionName) {
  const idx = schema.value[sectionId]?.children.findIndex((e) => e.id === id);

  if ([-1, undefined].includes(idx)) return;

  schema.value[sectionId]?.children.splice(idx, 1);
}

let isSettingsModal = $ref(false);

let configModalContext = $ref<{
  name: componentNames;
  configTypes: (keyof CombinedComponentConfig)[];
  section: SectionName;
  existingConfig?: CombinedConfig;
}>({} as any);

const reset = () =>
  (configModalContext = {
    configTypes: [],
  } as any);

function toggleModal() {
  isSettingsModal = !isSettingsModal;
}

function openConfigModal(name: componentNames, section: SectionName) {
  let child = schema.value[section]?.children.filter((e) => e.component === name)[0];

  if (!child) return;

  configModalContext = {
    name: name,
    configTypes: INVOICE_SCHEMA[section]?.components[name] || [],
    section,
    existingConfig: child.config,
  };

  toggleModal();
}

function handleConfig(config: CombinedConfig) {
  let child = schema.value[configModalContext.section]?.children.filter(
    (e) => e.component === configModalContext.name,
  )[0];

  if (!child) return;

  child.config = config;

  reset();
}
</script>
<template>
  <div class="p-3 flex space-x-3 h-full max-h-full">
    <config-modal
      v-model="isSettingsModal"
      :component="configModalContext.name"
      :config-types="configModalContext.configTypes"
      :previous-config="configModalContext.existingConfig"
      @config="handleConfig"
    />

    <div class="w-1/3 flex-none">
      <pre class="text-xs text-gray-800 p-2 rounded-md bg-gray-200 !break-all !break-words">
  {{ schema }}
    </pre
      >
    </div>

    <div class="flex-grow bg-gray-100 border border-gray-300 rounded-md">
      <div
        v-for="section in loopableSchema"
        :key="section[0]"
        :id="section[0]"
        :class="[
          ...(section[1].classes || []),
          { 'min-h-24': !schema[section[0]] || !schema[section[0]]!.children.length },
        ]"
        class="p-1 flex relative"
      >
        <div
          class="
            absolute
            inset-0
            bg-gray-200
            rounded-md
            duration-300
            transition-opacity
            ease-in-out
            hover:opacity-100
            group
            flex-col
            space-y-1
            py-1
            opacity-0
          "
        >
          <div class="text-center text-gray-500 font-semibold uppercase">{{ section[0] }}</div>
          <!-- //? manage components container -->
          <div class="flex space-x-3 text-xs p-2">
            <div class="flex-none">
              <f-menu
                :options="trasformComponentsToOptions(section[1].components, schema[section[0]]?.children || [])"
                option-key="value"
                label="Add element"
                v-model="model"
                :sm="true"
                @input="handleAddElement($event, section[0])"
                v-if="schema[section[0]]?.children.length !== INVOICE_SCHEMA[section[0]]?.max"
                color="lime"
              />
              <div v-else>No slot to fill</div>
            </div>

            <div class="flex-grow">
              <div class="text-md mb-1">Components {{ schema[section[0]]?.children.length }}</div>

              <div class="flex space-x-2">
                <div
                  class="flex space-x-2 items-center w-1/3 justify-between py-1 px-2 rounded-md bg-gray-100"
                  v-for="{ component, id } in schema[section[0]]?.children"
                  :key="id"
                >
                  <div>{{ component }}</div>
                  <div class="flex space-x-1">
                    <k-action icon="mdi:cog" @click="openConfigModal(component, section[0])" />
                    <k-action icon="mdi:trash-can-outline" type="danger" @click="handleRemoveEl(id, section[0])" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <tree-node v-if="schema[section[0]]" :node="schema[section[0]]" />
      </div>
    </div>
  </div>
</template>
