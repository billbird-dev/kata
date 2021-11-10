<script setup lang="ts">
// import { ref } from 'vue';
import { Container } from 'kata';
import ComponentDesc from 'src/components/ComponentDesc.vue';
import ComponentWrap from 'src/components/ComponentWrap.vue';
</script>
<template>
  <div class="flex flex-col space-y-3 w-3/4 mx-auto">
    <div class="text-lg">Kitchen sink of all components</div>

    <component-wrap>
      <component-desc>
        <div class="text-sm">Container</div>
        <div class="text-xs">Wrapper for all components. A normal flex div</div>
      </component-desc>

      <container>Hello</container>
    </component-wrap>
  </div>
</template>
<style lang="scss" scoped></style>
