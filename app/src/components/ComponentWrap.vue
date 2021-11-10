<script setup lang="ts"></script>
<template>
  <div class="flex flex-col space-y-1 border border-gray-300 rounded-md">
    <slot />

    <div class="p-1">
      <slot name="component" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
