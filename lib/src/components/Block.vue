<script setup lang="ts">
import { computed } from 'vue';

import { StyleTools } from '../types/styles';
import { generateStyles } from '../utils';

const props = defineProps<{ config: StyleTools }>();

const classes = computed(() => generateStyles(props.config));
</script>
<template>
  <div class="flex" :class="classes">
    <slot />
  </div>
</template>
