import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'

import { auth, onAuthStateChanged } from './services/firebaseConfig.js'
import { signOut } from 'firebase/auth'

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

const store = createStore({
  state() {
    return {
      auth: null
    }
  },
  mutations: {
    currentLogin(state, resolve) {
      state.auth = resolve
    },
    signOut(state) {
      if (state.auth != null) {
        signOut(auth)
        state.auth = null
      }
    }
  },
  actions: {
    checkCurrentLogin() {
      return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
          auth,
          (user) => {
            removeListener()
            resolve(user)
          },
          reject
        )
      })
    }
  },
  getters: {
    getAuth(state) {
      return state.auth
    }
  }
})

store.dispatch('checkCurrentLogin').then((value) => {
  store.commit('currentLogin', value)
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Vue3Toasity)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
