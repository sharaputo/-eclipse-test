import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vueClickOutsideElement from 'vue-click-outside-element';
import '@/assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(vueClickOutsideElement, 'click-outside');

app.mount('#app');
