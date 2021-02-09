import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

//路由导航冗余报错（路由重复）
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter);
const Home = () => import("../views/home/Home");
const Hot = () => import("../views/hot/Hot");
const User = () => import("../views/user/User")
const SongsList = () => import( "../views/songslist/SongsList");
const ListOfLists=()=>import("../views/listoflists/ListOfLists")
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
  },
  {
    path: '/listoflists',
    name: 'ListOfLists',
    component: ListOfLists
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
