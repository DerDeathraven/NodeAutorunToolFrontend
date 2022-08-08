<template>
  <div class="tile">
    <div class="header">
      <h1 class="py-2 text-xl">{{ title }}</h1>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type tileProps = {
  title: string;
};
defineProps<tileProps>();
</script>

<style scoped lang="scss">
.tile {
  background-color: $tile;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  @apply max-w-lg;
}
</style>
