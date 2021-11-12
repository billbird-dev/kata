<script setup lang="ts">
import { Block } from 'src/types';
import TreeNode from 'src/components/TreeNode.vue';
import KButton from 'src/components/KButton.vue';
import { randomId } from 'src/utils';

let schema = $ref<Block[]>([
  {
    component: 'kata-header',
    children: [
      {
        component: 'header-info',
        props: {
          data: {
            name: 'Bangali Traders',
            address: 'Home',
            branch: 'BBSR',
            gstin: 'ssss',
            phone: '988989989',
          },
        },
        id: randomId(),
      },
    ],
    id: randomId(),
  },
]);

function addMore() {
  schema.push({
    component: 'kata-header',
    children: [
      {
        component: 'header-info',
        props: {
          data: {
            name: 'Bangali Traders',
            address: 'Home',
            branch: 'BBSR',
            gstin: 'ssss',
            phone: '988989989',
          },
        },
        id: randomId(),
      },
    ],
    id: randomId(),
  });
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

    <div class="flex-grow">
      <div class="flex flex-col space-y-2">
        <tree-node v-for="node in schema" :key="node.id" :node="node" />
      </div>
      <k-button class="mt-5" @click="addMore">more</k-button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
