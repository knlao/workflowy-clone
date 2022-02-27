<template>
  <div class="body">
    <input type="checkbox" :id="content.id" v-model="doDropDown" />
    <label
      :for="content.id"
      class="dropdownArrow"
      :class="{ active: doDropDown }"
    >
      <svg height="25" width="25">
        <polygon points="10,8 10,17 18,12.5" />
      </svg>
    </label>

    <!-- <router-link
      :to="{
        name: 'Node',
        params: { id: content.id },
      }"
      ><n-button strong secondary circle>⨀</n-button></router-link
    > -->

    <n-input
      v-if="isEditing"
      v-model:value="content.description"
      autosize
      style="min-width: 50%"
      @focusout="doneEditText()"
      @keyup.enter.exact="emitNew()"
      @keyup.shift.enter="addNewChildren()"
      @keyup.shift.delete="deleteCurrentItem()"
      autofocus
    />
    <p v-else @dblclick="editText()">
      <span v-html="output"></span>
    </p>
  </div>

  <div class="down" v-show="doDropDown">
    <div v-for="contentC in content.contents" :key="contentC">
      <Content
        :contentObj="contentC"
        @addNew="addNewItem()"
        @destroyThis="destroyItem(contentC)"
      />
    </div>
  </div>
  <!-- <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <n-button strong secondary circle>+</n-button>
  </n-dropdown> -->
</template>

<script setup>
import { ref, computed } from "vue";
import { NInput, NButton, NDropdown } from "naive-ui";
import { marked } from "marked";
import { debounce } from "lodash-es";

const emit = defineEmits(["addNew", "destroyThis"]);

const props = defineProps(["contentObj"]);
const content = ref(props.contentObj);
const doDropDown = ref(false);
const isEditing = ref(false);

const options = ref([
  {
    label: "New Item",
    key: "New Item",
  },
  {
    label: "New Children",
    key: "New Children",
  },
]);

const editText = () => {
  isEditing.value = true;
};
const doneEditText = () => {
  isEditing.value = false;
};

const emitNew = () => {
  doneEditText();
  emit("addNew");
};

const addNewItem = () => {
  let rndId = Math.random();
  content.value.contents.push({
    description: "New Item",
    id: rndId.toString(),
    contents: [],
  });
};

const addNewChildren = () => {
  let rndId = Math.random();
  content.value.contents.push({
    description: "New Item",
    id: rndId.toString(),
    contents: [],
  });
  isEditing.value = false;
  doDropDown.value = true;
};

const deleteCurrentItem = () => {
  emit("destroyThis");
};

const destroyItem = (obj) => {
  content.value.contents.splice(content.value.contents.indexOf(obj), 1);
};

const output = computed(() => marked(content.value.description));

// const update = debounce((e) => {
//   content.value.description = e.target.value;
// }, 100);
</script>

<style>
.body {
  display: flex;
  align-items: center;
}
.down {
  margin-left: 100px;
}

input[type="checkbox"] {
  content: "";
  width: 0;
  height: 0;
}

.dropdownArrow {
  transition: transform 0.1s ease-in-out;
}
.dropdownArrow.active {
  transform: rotate(90deg);
}

input[type="text"] {
  width: 1500px;
}

code {
  padding: 3px 8px;
  background-color: rgb(223, 223, 223);
  border-radius: 5px;
  color: crimson;
}
</style>