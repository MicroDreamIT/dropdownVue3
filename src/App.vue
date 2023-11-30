

<script setup>
import {reactive, ref, watch} from "vue";
/*
*item can be an Array list of simple item
* or it can be an Array list of Object with keys: text, value
* for example [{text:'a', value:1}, {text:'b', value:2}]
 */
const items=reactive([1, 2, 3])
const selected = ref(null)

watch(()=>selected, (newVal) => {
}, { deep: true });

</script>

<template>
  <header>
  </header>

  <main>
    <DropDown
        :items="items"
        v-model="selected"
        multi-select
    />
  </main>
</template>
