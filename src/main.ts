import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store/index';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/fluent-light/theme.css'; //theme
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(router);
app.use(store, key);
app.mount('#app');
