import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      middleware: "auth"
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      middleware: "guest"
    },
    component: () => import("../views/AboutView.vue")
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      middleware: "none"
    },
    component: () => import('../views/Auth/RegisterView.vue')
  },

  {
    path: '/login',
    name: 'login',
    meta: {
      middleware: "none"
    },
    component: () => import('../views/Auth/LoginView.vue')
  },

  {
    path: '/test',
    name: 'test',
    meta: {
      middleware: "none"
    },
    component: () => import('../views/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {


  // redirect to login if not auth
  if (to.meta.middleware == "auth" && !store.state.auth.authenticated) {
    next({ name: "login" });
  }

  if (store.state.auth.authenticated && (to.name == 'login' || to.name == 'register')) {
    next({ name: "home" });
  }


  next();


})

export default router
