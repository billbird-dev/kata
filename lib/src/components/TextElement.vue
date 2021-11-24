<script setup lang="ts">
import { computed } from 'vue';
import { generateStyles } from '../utils';
import { TextElementData } from '../types/index';
import { TextElementStyles } from '../types/styles';

const props = withDefaults(
  defineProps<{
    config?: TextElementStyles;
    data: TextElementData;
  }>(),
  {
    config: () => ({
      align: 'center',
      flex: 'grow',
      justify: 'center',
      fontSize: 'lg',
    }),
  },
);

const classes = computed(() => [...generateStyles(props.config), `text-${props.config.fontSize || 'lg'}`]);
</script>
<template>
  <div class="flex" :class="classes">
    <div>{{ data.content }}</div>
  </div>
</template>
