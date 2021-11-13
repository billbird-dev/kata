<script setup lang="ts">
import { Block, Classes, CombinedConfig, componentNames } from 'src/types';
import TreeNode from 'src/components/TreeNode.vue';
import { randomId } from 'src/utils';
import { CombinedComponentConfig } from '../../../lib/src';
import { FMenu } from 'furikaeru';

type SectionName = 'header' | 'intro' | 'info' | 'items' | 'total-footer' | 'summary' | 'misc';

type AcceptedComponents = { [x in Block['component']]?: (keyof CombinedComponentConfig)[] };

interface Section {
  name: SectionName;
  classes?: Classes;
  max: number;
  components: AcceptedComponents;
}

type InvoiceSchema = { [x in SectionName]?: Section };

let schema = $ref<{ [x in SectionName]?: Block }>({
  header: {
    component: 'kata-header',
    children: [
      // {
      //   component: 'header-info',
      //   props: {
      //     data: {
      //       name: 'Bangali Traders',
      //       address: 'Home',
      //       branch: 'BBSR',
      //       gstin: 'ssss',
      //       phone: '988989989',
      //     },
      //   },
      //   id: randomId(),
      // },
    ],
    parent: true,
    id: randomId(),
  },
});

// function addMore() {
//   schema.push({
//     component: 'kata-header',
//     children: [
//       {
//         component: 'header-info',
//         props: {
//           data: {
//             name: 'Bangali Traders',
//             address: 'Home',
//             branch: 'BBSR',
//             gstin: 'ssss',
//             phone: '988989989',
//           },
//         },
//         id: randomId(),
//       },
//     ],
//     id: randomId(),
//   });
// }

// - component
// - id
// - children
//   - kata block @type {Block}
// - config @type {CombinedConfig}
// - props -> any {}

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

let loopableSchema = $computed(() => Object.entries(INVOICE_SCHEMA) as any as [SectionName, Section][]);

function trasformComponentsToOptions(components: AcceptedComponents) {
  return Object.keys(components).map((key) => ({ label: key, value: key }));
}

let model = $ref('');

function handleAddElement(element: string | number, sectionId: SectionName) {
  element = element as any as componentNames;

  if(!schema[sectionId]) return;
  const slots = schema[sectionId]?.children.length;

  // const rest = slots && slots > 0 ? INVOICE_SCHEMA[sectionId]?.max -   

  // track how much filled
  // check max - filled
  // construct block
  // append to parent

  console.log(element, sectionId);
}
</script>
<template>
  <div class="p-3 flex space-x-3 h-full max-h-full">
    <div class="w-1/3 flex-none">
      <pre class="text-xs text-gray-800 p-2 rounded-md bg-gray-200">
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
            flex
            items-center
            justify-center
            bg-gray-200
            rounded-md
            duration-300
            transition-opacity
            ease-in-out
            hover:opacity-100
            group
            opacity-0
          "
        >
          <div class="p-2 transition-opacity duration-300 group-hover:opacity-100 opacity-0">
            <f-menu
              :options="trasformComponentsToOptions(section[1].components)"
              option-key="value"
              label="Add element"
              v-model="model"
              :sm="true"
              @input="handleAddElement($event, section[0])"
            />
          </div>
        </div>

        <tree-node v-if="schema[section[0]]" :node="schema[section[0]]" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
