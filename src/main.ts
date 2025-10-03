import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/css/app.css'
import { FontAwesomeIcon } from '@/plugins/fontawesome'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
