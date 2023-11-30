<!--
Docs:Upwork assignment test to develop a dropdown
It's developed using input and list item to have more control to manipulate
its behavior.

Component Name: DropDown
Type: Global
Targeted Props: items, multiSelect, text-name, value-name, return-object
Completed: items, multiSelect

@todo: text-name, value-name, return-object,
@todo: need to remove value from input
@todo: search value from input

Timeline: Nov, 30 4pm
-->
<script setup>
import {computed, ref, watch} from "vue";
import _ from "lodash";

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
  modelValue: {
    type: Array,
  }
})

const emit = defineEmits(['update:modelValue'])

/*
* array that store selected item from dropdown
*/
const selectedItems = ref([])
const showDropdown = ref('none')


/*
* emit value immediate after changes
*/
watch(() => selectedItems, (newVal) => {
  emit('update:modelValue', newVal.value)
}, {deep: true});

/*
* Array should be mapped properly.
*
* Here if Array is not a list of Objects
* then it should be converted to list of Objects.
*/
const processedItems = computed((val) => {
  if (props.items.length && !_.isObject(props.items[0])) {
    return props.items.map(v => {
      return {text: v, value: v}
    })
  }
})


const normalizeItemsForInput = computed(() => {
  if (selectedItems.value.length) {
    return selectedItems.value.map(v => v.value)
  }
})


/**
 * toggle selected item inside array
 */
const addItems = (item) => {
  if (item && props.multiSelect)
    addItemForMultiSelect(item)
  else
    addItemForSingleSelect(item)
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

/*
* add logics here when click outside
* mostly this method can be used for styling
* */
const hideDropdown = () => {
  showDropdown.value = 'none'
}

</script>
<template>
  <div v-click-outside="hideDropdown">
    <p v-for="selected in selectedItems">
      {{ selected }}
    </p>
    <input
        readonly
        type="text"
        :value="normalizeItemsForInput"
        @focus="showDropdown='block'"
    >
    <ul :style="{'display':showDropdown}">
      <template v-for="(item, index) in processedItems" :key="`${index}`">
        <li
            @click="addItems(item)"
            @select="addItems(item)"
        >
          <span>{{ item.text }}</span>
          <input
              type="checkbox"
              :value="item.value"
              :checked="selectedItems.includes(item)"
              v-if="multiSelect"/>
        </li>
      </template>

    </ul>
  </div>
</template>

<style scoped lang="scss">
$border_color: 1px solid rgba(128, 128, 128, 0.99);
$line_height_value: 1.8;
input[type=text] {
  width: 100%;
  line-height: $line_height_value;
}
ul {
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 3px;
  li {
    cursor: pointer;
    line-height: $line_height_value;
    border-bottom: $border_color;
  }
}
</style>