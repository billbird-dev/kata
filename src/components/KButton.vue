<script setup lang="ts"></script>
<template>
  <button
    class="
      px-3
      py-1
      bg-lime-400
      border-none
      rounded-md
      text-sm
      hover:bg-lime-500
      transition-colors
      duration-300
      ease
      focus:(ring
      outline-none
      border-lime-400)
    "
  >
    <slot />
  </button>
</template>
<style lang="scss" scoped></style>
