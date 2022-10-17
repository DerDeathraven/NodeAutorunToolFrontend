<template>
  <Tile :title="activeScript" class="h-full">
    <div class="overflow-auto flex flex-col h-full">
      <LogEntry
        v-for="(entry, key) of logArr"
        :key="key"
        :entry="entry"
      ></LogEntry>
    </div>
  </Tile>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useExecutionStore } from "../../stores/executionStore";
import Tile from "../tile.vue";
import LogEntry from "../LogEntry.vue";
const executionStore = storeToRefs(useExecutionStore());
const activeScript = computed(() => {
  console.log(executionStore.activeScript.value);
  if (executionStore.activeScript.value != "") {
    return executionStore.activeScript.value;
  }
  return "Global Logs";
});
const logArr = computed(() => {
  if (executionStore.activeScript.value != "") {
    return executionStore.scriptLog.value;
  }
  return executionStore.getNormalizedGlobalLogs.value;
});
</script>

<style scoped></style>
