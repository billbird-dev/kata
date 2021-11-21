<script setup lang="ts">
import { FIcon } from 'furikaeru';

const props = withDefaults(
  defineProps<{
    size?: string;
    icon?: string;
    type?: 'danger' | 'success';
  }>(),
  {
    type: 'success',
    size: '17px',
  },
);

defineEmits(['click']);

let classes = $computed(() => {
  if (props.type === 'danger') return `text-red-600 hover:bg-red-100`;
  return `text-lime-500 hover:bg-lime-100`;
});
</script>
<template>
  <f-icon
    v-bind="{ ...$props, ...$attrs, ref: undefined }"
    :class="classes"
    class="p-[6px] rounded-full cursor-pointer transition-colors duration-300 ease rounded-full cursor-pointer"
    @click="$emit('click')"
  />
</template>
