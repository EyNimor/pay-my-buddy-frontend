import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Transfer from '../views/Transfer.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'
import LogIn from '../views/LogIn.vue'
import Register from '../views/Register.vue'
import AddConnection from '../views/AddConnection.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/transfer',
    name: 'Tranfer',
    component: Transfer
  },
  {
    path:'/connection',
    name: 'AddConection',
    component: AddConnection
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
