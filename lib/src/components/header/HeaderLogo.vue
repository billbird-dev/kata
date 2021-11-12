<script setup lang="ts">
import { computed } from 'vue';
import { StyleTools } from '../../types/styles';
import { generateStyles } from '../../utils';

const props = withDefaults(
  defineProps<{ config?: StyleTools; imgSrc: string; alt?: string }>(),
  {
    config: () => ({
      align: 'center',
      flex: 'none',
      justify: 'start',
    }),
  },
);

const classes = computed(() => generateStyles(props.config));
</script>
<template>
  <div class="flex" :class="classes">
    <img
      class="max-w-150px max-h-150px w-full h-full rounded-md shadow-sm"
      :src="imgSrc"
      :alt="alt"
    />
  </div>
</template>
