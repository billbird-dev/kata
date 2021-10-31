<script setup lang="ts"></script>
<template>
  <button
    class="
      px-3
      py-1
      bg-lime-400
      border-none
      outline-transparent
      rounded-md
      text-sm
      hover:bg-lime-500
      transition-colors
      duration-300
      ease
    "
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
<style lang="scss" scoped></style>
