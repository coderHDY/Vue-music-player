import Vue from 'vue'
import VueRouter from 'vue-router'
const SongsList=()=>import( "../views/songslist/SongsList");

Vue.use(VueRouter)
const Home = () => import("../views/home/Home");
const Hot = () => import("../views/hot/Hot");
const User = () => import("../views/user/User")
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/hot',
    name: 'Hot',
    component: Hot
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/songslist',
    name: 'SongsLost',
    component: SongsList
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
