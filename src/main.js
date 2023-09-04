import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import App from './App.vue';
import router from './router';

library.add(
  solidIcons.faSort,
  solidIcons.faCircleUser,
  solidIcons.faAngleDown,
  solidIcons.faBarcode,
);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount('#app');
