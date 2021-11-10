<script setup lang="ts"></script>
<template>
  <button
    class="
      px-3
      py-1
      bg-lime-300
      rounded-md
      text-sm
      hover:bg-lime-400
      transition-colors
      duration-300
      ease
      focus:(outline-none
      shadow-inner)
    "
  >
    <slot />
  </button>
</template>
<style lang="scss" scoped></style>
