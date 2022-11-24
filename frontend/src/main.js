import { createApp } from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

createApp(App)
.use(VTooltip)
.use(PerfectScrollbar)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app');
