<template>
  <Tile title="Autorun Scripts">
    <ul class="text-txt-light">
      <li v-for="script in scripts" class="entry">
        <span> {{ script }}</span>
        <div
          class="cursor-pointer flex-col justify-center items-center hidden icons"
          @click="runScript(script)"
        >
          <img :src="playIcon" class="h-3" />
        </div>
      </li>
    </ul>
  </Tile>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useExecutionStore } from "../../stores/executionStore";
import { getAssuredResponse } from "../../websocket/getAssuredResponse";
import playIcon from "../../assets/play-solid.svg";
import Tile from "../tile.vue";
const executionStore = useExecutionStore();
const scripts: Ref<string[]> = ref([]);
onMounted(async () => {
  try {
    scripts.value = await getAssuredResponse("getScripts", "true");
  } catch (error) {
    console.log(error);
  }
});
function runScript(script: string) {
  executionStore.executeScript(script);
}
function changeColor(element: HTMLObjectElement) {
  console.log(playIcon);
}
</script>

<style scoped>
.entry {
  transition: 0.2s all;
  @apply hover:bg-slate-500 rounded px-1 flex justify-between;
}
.entry:hover .icons {
  @apply flex;
}
</style>
