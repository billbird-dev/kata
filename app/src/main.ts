import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import 'furikaeru/dist/style.css';
import '@purge-icons/generated';
import 'src/index.scss';
//@ts-expect-error
import vClickOutside from 'click-outside-vue3';

import { KataHeader, HeaderInfo, HeaderLogo } from '../../lib/src';

const app = createApp(App);

app.use(vClickOutside);

app.component('kata-header', KataHeader).component('header-info', HeaderInfo).component('header-logo', HeaderLogo);

app.mount('#app');
