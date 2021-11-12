import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';

import { KataHeader, HeaderInfo, HeaderLogo } from '../../lib/src';

const app = createApp(App);

app.component('kata-header', KataHeader).component('header-info', HeaderInfo).component('header-logo', HeaderLogo);

app.mount('#app');
