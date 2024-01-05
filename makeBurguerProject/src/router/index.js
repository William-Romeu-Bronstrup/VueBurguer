import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

import { verifyCurrentLogin } from '@/helpers/verifyLogin'
import { toast } from 'vue3-toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register-account',
      name: 'RegisterAccount',
      component: () => import('../views/RegisterAccount.vue')
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: () => import('../views/Pedidos.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await verifyCurrentLogin()) {
      next()
    } else {
      toast.error('Você não tem permissão!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        limit: 1,
        multiple: false
      })

      return next('/login')
    }
  } else {
    next()
  }
})

export default router
