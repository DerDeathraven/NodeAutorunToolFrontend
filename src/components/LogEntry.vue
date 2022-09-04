<template>
  <div class="flex" :class="generateClass()">
    <div v-if="!message">-----------------------</div>
    <div>[{{ time.getHours() + ":" + formatedMinute }}]</div>
    <div>{{ message }}</div>
    <div v-if="!message">-----------------------</div>
  </div>
</template>

<script setup lang="ts">
import { LogEntry } from "../Model/Server-Client-Coms/scripts";
import { ab2str } from "./helper/string/ArrayBufferToString";

type LogEntryProps = {
  entry: LogEntry;
};
const props = defineProps<LogEntryProps>();
const time = new Date(props.entry.time);
const message = ab2str(props.entry.output);
const formatedMinute =
  time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
function generateClass(): string[] {
  const retArr: string[] = [];
  switch (props.entry.type) {
    case "WARNING":
    case "CRASH":
      retArr.push("error");
      break;
    case "FINISH":
      retArr.push("success");
      break;
  }
  return retArr;
}
</script>

<style scoped>
.success {
  color: rgb(5, 204, 5);
}
.error {
  color: red;
}
</style>
