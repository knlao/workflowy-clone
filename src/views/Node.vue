<template>
  <p><span v-html="output"></span></p>
  <div v-for="content in contents.contents" :key="content.id">
    <Content :contentObj="content" />
  </div>
  <n-button strong secondary circle>+</n-button>
</template>

<script setup>
import Content from "../components/Content.vue";

import { ref, computed } from "vue";
import { marked } from "marked";
import { NButton } from "naive-ui";

const contents = ref([]);
const props = defineProps(["id"]);

const load = async () => {
  const data = await fetch("http://localhost:3000/contents");
  const c = await data.json();
  contents.value = await customFilter(c, "id", props.id);

  console.log(contents.value);
};

load();

const customFilter = (object, key, value) => {
  if (Array.isArray(object)) {
    for (const obj of object) {
      const result = customFilter(obj, key, value);
      if (result) {
        return obj;
      }
    }
  } else {
    if (object.hasOwnProperty(key) && object[key] === value) {
      return object;
    }

    for (const k of Object.keys(object)) {
      if (typeof object[k] === "object") {
        const o = customFilter(object[k], key, value);
        if (o !== null && typeof o !== "undefined") return o;
      }
    }

    return null;
  }
};

const output = computed(() => marked(contents.value.description));
</script>

<style>
</style>
