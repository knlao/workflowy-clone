<template>
  <!-- <div v-for="content in contents" :key="content.id">
    <Content :contentObj="content" />
  </div> -->
  <Content :contentObj="contents" />
  <br />
  <h5>data:</h5>
  <p>{{ contents }}</p>
</template>

<script setup>
import Content from "../components/Content.vue";

import { ref } from "vue";

const contents = ref([]);

const load = async () => {
  // const data = await fetch("http://localhost:3000/contents");
  // const c = await data.json();

  if (
    localStorage.getItem("data") == null ||
    localStorage.getItem("data") == []
  ) {
    localStorage.setItem(
      "data",
      JSON.stringify({
        description: "# Main",
        id: 0,
        contents: [
          {
            description:
              "##### Vulputate no tincidunt vel at gubergren mazim consetetur magna ut erat takimata vero vel dolores.",
            id: "1",
            contents: [
              {
                description:
                  "Kasd erat stet *lobortis* dolore duo ipsum rebum sit nonummy takimata rebum sit.",
                id: "1_1",
                contents: [],
              },
              {
                description:
                  "Erat eirmod **sit** lobortis blandit dignissim diam voluptua consetetur sed dolor duo.",
                id: "1_2",
                contents: [
                  {
                    description:
                      "Dignissim te justo justo consequat voluptua ad sed sit kasd stet accusam.",
                    id: "1_2_1",
                    contents: [],
                  },
                ],
              },
            ],
          },
          {
            description:
              "Dolor sadipscing elit sit illum ut `dolor amet sit et sit` ut mazim sed.",
            id: "2",
            contents: [],
          },
        ],
      })
    );
  }

  const c = JSON.parse(localStorage.getItem("data"));
  contents.value = c;
};

const update = window.setInterval(() => {
  localStorage.setItem("data", JSON.stringify(contents.value));
}, 0);

load();
</script>

<style>
</style>
