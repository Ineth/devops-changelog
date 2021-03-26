import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/fluent-light/theme.css'; //theme
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.mount('#app');
