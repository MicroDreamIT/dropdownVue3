<script setup>
import {ref} from "vue";
import {watch} from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  multiSelect: {
    type: Boolean,
    default: false,
    required: false
  },
  modelValue:{
    type:Array,
  }
})

const emit = defineEmits(['update:modelValue'])

const showList = ref('none')

/*
* array that store selected item from dropdown
*/
const selectedItems = ref([])

// watch(()=>selectedItems, (newVal, oldVal) => {
//   console.log('service changed', newVal, oldVal);
// }, { deep: true });

/**
 * toggle selected item inside array
 */
const addItems = (item) => {
  if (item && props.multiSelect)
    addItemForMultiSelect(item)
  else
    addItemForSingleSelect(item)

  emit('update:modelValue', selectedItems.value)
}

const addItemForMultiSelect = (item) => {
  if (item && !selectedItems.value.includes(item))
    selectedItems.value.push(item)
  else
    selectedItems.value.splice(selectedItems.value.indexOf(item), 1)
}

const addItemForSingleSelect = (item) => {
  selectedItems.value.splice(0, selectedItems.value.length)
  selectedItems.value.push(item)
}
</script>
<template>
  <p v-for="selected in selectedItems">
    {{ selected }}
  </p>
  <input
      readonly
      type="text"
      :value="selectedItems"
  >
  <ul
  >
    <li
        :key="index"
        @click="addItems(item)"
        @select="addItems(item)"
        v-for="(item, index) in props.items"
    >
      {{ item }}
      <input

          type="checkbox"
          :value="item"
          :checked="selectedItems.includes(item)"
          v-if="multiSelect">
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  li {
    cursor: pointer;
  }
}
</style>