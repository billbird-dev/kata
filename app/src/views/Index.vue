<script setup lang="ts">
import { Block, Classes, componentNames } from 'src/types';
import TreeNode from 'src/components/TreeNode.vue';
import { randomId } from 'src/utils';
import { CombinedComponentConfig } from '../../../lib/src';
import { FMenu } from 'furikaeru';
import { ref } from 'vue';

type SectionName = 'header' | 'intro' | 'info' | 'items' | 'total-footer' | 'summary' | 'misc';

type AcceptedComponents = { [x in Block['component']]?: (keyof CombinedComponentConfig)[] };

interface Section {
  name: SectionName;
  classes?: Classes;
  max: number;
  components: AcceptedComponents;
}

type InvoiceSchema = { [x in SectionName]?: Section };

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
</script>
<template>
  <div class="p-3 flex space-x-3 h-full max-h-full">
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
          { 'min-h-24': !schema[section[0]] || !schema[section[0]].children.length },
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
            opacity-0
            py-1
          "
        >
          <div class="text-center text-gray-500 font-semibold uppercase">{{ section[0] }}</div>
          <div class="grid grid-cols-2 space-x-3 p-2">
            <!-- //? manage components container -->
            <div class="flex-grow flex space-x-1 justify-between text-xs">
              <div class="flex-col space-y-1">
                <div>Add component</div>
                <div>current components count: {{ schema[section[0]]?.children.length }}</div>
              </div>
              <f-menu
                :options="trasformComponentsToOptions(section[1].components, schema[section[0]]?.children || [])"
                option-key="value"
                label="Add element"
                v-model="model"
                :sm="true"
                @input="handleAddElement($event, section[0])"
                v-if="schema[section[0]]?.children.length !== INVOICE_SCHEMA[section[0]]?.max"
              />
            </div>

            <!-- //? child config container -->
            <div class="flex-grow flex space-x-1 justify-between text-xs">
              <div class="flex-col space-y-1">
                <div>Config</div>
              </div>
              <!-- <f-menu
                :options="trasformComponentsToOptions(section[1].components, schema[section[0]]?.children || [])"
                option-key="value"
                label="Add element"
                v-model="model"
                :sm="true"
                @input="handleAddElement($event, section[0])"
              /> -->
            </div>
          </div>
        </div>

        <tree-node v-if="schema[section[0]]" :node="schema[section[0]]" />
      </div>
    </div>
  </div>
</template>
