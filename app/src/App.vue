<script setup lang="ts">
import Sink from './views/Sink.vue';
import Builder from './views/Index.vue';
import { FButton } from 'furikaeru';
import Listing from './views/Listing.vue';

let view = $ref<'sink' | 'index' | 'listing'>('listing');

let selectedSchema = $ref('');

function handleSelectSchema(schema: string) {
  selectedSchema = schema;

  view = 'index';
}
</script>
<template>
  <div>
    <div class="w-full flex items-center justify-between bg-gray-100 p-1 sticky top-0 z-1000">
      <div class="flex items-center space-x-3">
        <div class="text-lime-600 font-bold text-xl cursor-pointer" @click="view = 'listing'">Kata</div>
        <f-button
          color="lime"
          sm
          class="cursor-pointer"
          icon="mdi:arrow-left-circle-outline"
          @click="view = 'listing'"
          size="17px"
          flat
          v-if="view === 'index'"
          label="back"
        />
      </div>

      <div class="flex items-center space-x-1">
        <f-button
          color="lime"
          sm
          class="cursor-pointer"
          icon="mdi:library-shelves"
          @click="view = 'sink'"
          label="sink"
          size="17px"
        />

        <f-button
          color="lime"
          sm
          class="cursor-pointer"
          icon="mdi:home"
          @click="view = 'listing'"
          label="home"
          size="17px"
        />
      </div>
    </div>

    <div class="p-2">
      <sink v-if="view === 'sink'" />
      <listing v-else-if="view === 'listing'" @select-schema="handleSelectSchema" />
      <builder :schema-id="selectedSchema" v-else />
    </div>
  </div>
</template>
