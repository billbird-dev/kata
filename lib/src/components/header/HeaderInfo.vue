<script setup lang="ts">
import { computed } from 'vue';
import { HeaderInfoStyles } from '../../types/styles';
import { generateStyles } from '../../utils';
import { HeaderHints } from '../../types/index';

const props = withDefaults(
  defineProps<{ config?: HeaderInfoStyles; data: HeaderHints }>(),
  {
    config: () => ({
      align: 'start',
      flex: 'grow',
      justify: 'start',
      space: '1',
    }),
  },
);

const classes = computed(() => [
  ...generateStyles({ ...props.config, align: props.config.align || 'start' }),
  `space-y-${props.config.space || '1'}`,
]);
</script>
<template>
  <div class="flex flex-col" :class="classes">
    <div
      v-for="row in Object.entries(data)"
      :key="row[0]"
      :class="[row[0] === 'name' ? 'text-lg' : 'text-sm']"
    >
      <template v-if="['address', 'name'].includes(row[0])">
        {{ row[1] }}
      </template>

      <template v-else> {{ row[0].toUpperCase() }} : {{ row[1] }} </template>
    </div>
  </div>
</template>
