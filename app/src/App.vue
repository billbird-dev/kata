<script setup lang="ts">
import Sink from './views/Sink.vue';
import Views from './views/Index.vue';
import KButton from './components/KButton.vue';

let view = $ref<'sink' | 'index'>('sink');
</script>
<template>
  <div>
    <div class="w-full flex items-center justify-between bg-gray-100 p-1">
      <div class="text-lime-600 font-bold text-xl">Kata</div>
      <div class="flex space-x-1">
        <k-button @click="view = 'sink'"> sink </k-button>
        <k-button @click="view = 'index'"> home </k-button>
      </div>
    </div>

    <div class="p-2">
      <sink v-if="view === 'sink'" />

      <views v-else />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
