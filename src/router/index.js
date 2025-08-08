import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue';
import WeatherView from '../views/WeatherView.vue';
import CountBookAPI from '../views/CountBookAPI.vue';
const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
  path: '/GetAllBookAPI',
  component: () => import('../views/GetAllBookAPI.vue')
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('../views/AccessDeniedView.vue')
  },
  {
    path: '/FireRegister',      
    name: 'FireRegister',       
    component: FirebaseRegisterView 
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { useAuth } from '../auth'

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router