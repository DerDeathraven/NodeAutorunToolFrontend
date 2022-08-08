<template>
  <Tile title="Autorun Scripts">
    <ul>
      <li v-for="script in scripts">{{ script }}</li>
    </ul>
  </Tile>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { getAssuredResponse } from "../../websocket/getAssuredResponse";
import Tile from "../tile.vue";
const scripts: Ref<string[]> = ref([]);
onMounted(async () => {
  try {
    scripts.value = await getAssuredResponse("getScripts", "true");
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
