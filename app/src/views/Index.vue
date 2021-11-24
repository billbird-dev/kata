<script setup lang="ts">
import {
  AcceptedComponents,
  Block,
  CombinedConfig,
  componentNames,
  InvoiceSchema,
  KataSchema,
  Section,
  SectionName,
} from 'src/types';
import TreeNode from 'src/components/TreeNode.vue';
import { randomId } from 'src/utils';
import { FMenu } from 'furikaeru';
import { onMounted, ref } from 'vue';
import KAction from 'src/components/KAction.vue';
import ConfigModal from 'src/components/ConfigModal.vue';
import { CombinedComponentConfig } from '../../../lib/src';
import { schemaStore } from 'src/store/schema';
import { SCHEMA_BASE } from 'src/utils/constants';

const props = defineProps<{
  schemaId: string;
}>();

onMounted(() => {
  const schemaFromDb = schemaStore.value.get(props.schemaId);

  if (!schemaFromDb) return;

  schema.value = schemaFromDb;
});

// schema
const schema = ref<KataSchema>(SCHEMA_BASE);

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

// invoice sections schema config
const INVOICE_SCHEMA: InvoiceSchema = {
  header: {
    name: 'header',
    components: {
      'header-info': ['space', 'align', 'flex', 'justify', 'space'],
      'header-logo': ['align', 'flex', 'justify'],
    },
    max: 2,
  },
  intro: {
    name: 'intro',
    components: {
      'text-element': ['align', 'flex', 'fontSize', 'justify'],
    },
    max: 1,
  },
};

// schema components props store
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
  'text-element': {
    data: {
      content: 'TAX INVOICE',
    },
  },
  container: {},
};

// loopable invoice schema config to render sections
let loopableSchema = $computed(() => Object.entries(INVOICE_SCHEMA) as any as [SectionName, Section][]);

// transformer for menu
function trasformComponentsToOptions(components: AcceptedComponents) {
  return Object.keys(components).map((e) => ({ label: e, value: e }));
}

// menu model
let model = $ref('');

// add element handler
function handleAddElement(element: string | number, sectionId: SectionName) {
  element = element as componentNames;

  const section = schema.value[sectionId];

  // if no section or if element is already there retutn
  if (!section) return;
  if (isAdded(element, section.children)) return;

  const slots = section.children.length;
  const max = INVOICE_SCHEMA[sectionId]?.max || 0;

  // calculate if max slots is filled or not
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

// remove element handler
function handleRemoveEl(id: string, sectionId: SectionName) {
  const idx = schema.value[sectionId]?.children.findIndex((e) => e.id === id);

  if (idx === -1 || idx === undefined) return;

  schema.value[sectionId]?.children.splice(idx, 1);
}

let isSettingsModal = $ref(false);

// config modal context
let configModalContext = $ref<{
  name: componentNames;
  configTypes: (keyof CombinedComponentConfig)[];
  section: SectionName;
  existingConfig?: CombinedConfig;
}>({ configTypes: [] } as any);

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

// handle config assignment
function handleConfig(config: CombinedConfig) {
  let child = schema.value[configModalContext.section]?.children.filter(
    (e) => e.component === configModalContext.name,
  )[0];

  if (!child) return;

  child.config = config;

  reset();
}

// check if element is inside schema
function isAdded(name: string, children: Block[]) {
  return children.some((e) => e.component === name);
}

function getNode(node?: Block) {
  return node as Block;
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

    <div class="flex-grow bg-gray-100 border border-gray-300 rounded-md">
      <div
        v-for="section in loopableSchema"
        :key="section[0]"
        :id="section[0]"
        :class="[
          ...(section[1].classes || []),
          // { 'min-h-24': !schema[section[0]] || !schema[section[0]]!.children.length },
          'min-h-32',
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
                :options="trasformComponentsToOptions(section[1].components)"
                option-key="value"
                label="Add element"
                v-model="model"
                :sm="true"
                @input="handleAddElement($event, section[0])"
                v-if="schema[section[0]]?.children.length !== INVOICE_SCHEMA[section[0]]?.max"
                color="lime"
              >
                <template #option="{ option }">
                  <div
                    class="flex items-center"
                    :class="{ 'line-through cursor-not-allowed': isAdded(option, schema[section[0]]?.children || []) }"
                  >
                    {{ option }}
                  </div>
                </template>
              </f-menu>

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

        <tree-node v-if="getNode(schema[section[0]])" :node="getNode(schema[section[0]])" />
      </div>
    </div>

    <div class="flex-none">
      <pre class="text-xs text-gray-800 p-2 rounded-md bg-gray-200 !break-all !break-words">
  {{ schema }}
    </pre
      >
    </div>
  </div>
</template>
