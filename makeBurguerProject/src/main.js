import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

library.add(fas, far, fab)

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
