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

/**
 * toggle selected item inside array
 */
const addItems = (item) => {
  if (item && props.multiSelect)
    addItemForMultiSelect(item)
  else
    addItemForSingleSelect(item)
}

/*
* Array should be mapped properly.
*
* Here if Array is not a list of Objects
* then it should be converted to list of Objects.
*/
const processedItems = computed((val) => {
  if (props.items.length && !_.isObject(props.items[0])) {
    return props.items.map(v=> {
      return {text: v, value: v}
    })
  }
})


const normalizeItemsForInput = computed(()=>{
  if(selectedItems.value.length){
    return selectedItems.value.map(v=>v.value)
  }
})
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

const hideDropdown = () => {
  showDropdown.value = 'none'
}

</script>
<template>
  <pre>
    {{processedItems}}
  </pre>
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
      <li
          :key="index"
          @click="addItems(item)"
          @select="addItems(item)"
          v-for="(item, index) in processedItems"
      >
        {{ item.text }}
        <input
            type="checkbox"
            :value="item.value"
            :checked="selectedItems.includes(item)"
            v-if="multiSelect"/>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  li {
    cursor: pointer;
  }
}
</style>