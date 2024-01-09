import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'

import {
  db,
  auth,
  onAuthStateChanged,
  getDocs,
  collection,
  query,
  where
} from './services/firebaseConfig.js'
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
      auth: null,
      permission: null
    }
  },
  mutations: {
    currentLogin(state, resolve) {
      state.auth = resolve

      store.dispatch('currentPermission', resolve).then((permission) => {
        store.commit('getUserPermission', permission)
      })
    },
    getUserPermission(state, permission) {
      state.permission = permission
    },
    signOut(state) {
      if (state.auth != null) {
        signOut(auth)
        state.auth = null
        state.permission = null
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
    },
    async currentPermission(state) {
      if (state.state.auth) {
        let data = null

        const userPermission = await getDocs(
          query(collection(db, 'users'), where('uid', '==', state.state.auth.uid))
        )

        if (!userPermission.empty) {
          userPermission.forEach((doc) => {
            data = doc.data()
          })
        }

        if (data?.userType == null) {
          return false
        }

        return data.userType === 'admin' ? true : false
      }
    }
  },
  getters: {
    getAuth(state) {
      return state.auth
    },
    permissionUser(state) {
      return state.permission
    }
  }
})

store.dispatch('checkCurrentLogin').then((value) => {
  store.commit('currentLogin', value)

  store.dispatch('currentPermission', value).then((permission) => {
    store.commit('getUserPermission', permission)
  })
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Vue3Toasity)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
