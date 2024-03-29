// basic Vue imports 
import { createApp } from 'vue';
import App from './App.vue';

// individual global labraries
import VTooltip from 'v-tooltip';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import vueClickOutsideElement from 'vue-click-outside-element';
import 'charts.css';
import JsonExcel from "vue-json-excel3";

// PrimeVue
import PrimeVue from "primevue/config";
import MultiSelect from "primevue/multiselect";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import "primevue/resources/themes/vela-green/theme.css";     
import "primevue/resources/primevue.min.css";


// FA icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// important Vue parts

import router from './router';
import store from './store';
import * as api from './api'


library.add(fas, far, fab)
dom.watch();

// Read token from local storage and update axios token if exists
const accessToken = api.getAccessToken();
api.setAxiosAccessToken(accessToken);

createApp(App)
.use(VTooltip)
.use(PerfectScrollbar)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.use(store)
.use(vueClickOutsideElement)
.use(PrimeVue)
.component("MultiSelect", MultiSelect)
.component("InputText", InputText)
.component("Dropdown", Dropdown)
.component("SelectButton", SelectButton)
.component("downloadExcel", JsonExcel)
.mount('#app');
