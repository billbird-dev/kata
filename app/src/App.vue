<script setup lang="ts">
import Sink from './views/Sink.vue';
import Views from './views/Index.vue';
import { FButton } from 'furikaeru';

let view = $ref<'sink' | 'index'>('index');
</script>
<template>
  <div>
    <div class="w-full flex items-center justify-between bg-gray-100 p-1">
      <div class="text-lime-600 font-bold text-xl">Kata</div>
      <div class="flex space-x-1">
        <f-button
          color="lime"
          sm
          class="cursor-pointer"
          icon="mdi:library-shelves"
          @click="view = 'sink'"
          label="sink"
        />
        <f-button color="lime" sm class="cursor-pointer" icon="mdi:home" @click="view = 'index'" label="home" />
      </div>
    </div>

    <div class="p-2">
      <sink v-if="view === 'sink'" />

      <views v-else />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
