import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import DropDown from "@/components/DropDown.vue";
import clickOutside from './directives/clickOutside'
createApp(App)
    .directive("click-outside", clickOutside)
    .component('DropDown', DropDown)
    .mount('#app')
