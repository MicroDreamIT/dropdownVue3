<script setup>
import {reactive, ref} from "vue";
import DropDown from "@/components/DropDown.vue";
const items=reactive([1, 2, 3])
const selected = ref(null)
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
