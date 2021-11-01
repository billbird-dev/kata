<script setup lang="ts">
import { StyleTools } from '$lib/types/styles';
import { generateStyles } from '$lib/utils';
import { computed } from 'vue';

const props = defineProps<{ config: StyleTools }>();

const classes = computed(() => generateStyles(props.config));
</script>
<template>
  <div class="flex" :class="classes">
    <slot />
  </div>
</template>
