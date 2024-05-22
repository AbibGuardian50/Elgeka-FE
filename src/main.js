import './assets/main.css'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000
});

app.mount('#app')
