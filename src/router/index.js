import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import VideoDetail from '../components/VideoDetail.vue'
import Signup from '../views/Signup.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/video/:id', component: VideoDetail },
  { path: '/signup', name: 'Signup', component: Signup },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
