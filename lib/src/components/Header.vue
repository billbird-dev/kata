<script setup lang="ts">
import { computed } from 'vue';
import { StyleTools } from '../types/styles';
import { generateStyles } from '../utils';

const props = withDefaults(defineProps<{ config?: StyleTools }>(), {
  config: () => ({ align: 'center', flex: 'auto', justify: 'start' }),
});

const classes = computed(() => generateStyles(props.config));
</script>
<template>
  <div class="flex space-x-1 p-1" :class="classes">
    <slot />
  </div>
</template>
<style lang="scss" scoped></style>
