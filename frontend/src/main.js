// basic Vue imports 
import { createApp } from 'vue';
import App from './App.vue';

// individual global labraries
import VTooltip from 'v-tooltip';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

// FA icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// important Vue parts
import router from './router';


library.add(fas, far, fab)
dom.watch();

createApp(App)
.use(VTooltip)
.use(PerfectScrollbar)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.mount('#app');
