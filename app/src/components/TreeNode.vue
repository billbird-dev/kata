<script setup lang="ts">
import { Block } from 'src/types';

defineProps<{
  node: Block;
}>();
</script>
<template>
  <component
    :is="node.component"
    v-bind="{ config: node.config, ...node.props }"
    :class="node.classes"
    :style="node.styles"
    :key="node.id"
  >
    <template v-if="!!node.children && !!node.children.length">
      <tree-node v-for="child in node.children" :node="child" :key="child.id" />
    </template>
  </component>
</template>
