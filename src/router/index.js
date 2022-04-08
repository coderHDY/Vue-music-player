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
const SongsList = () => import("../views/songslist/SongsList");
const ListOfLists = () => import("../views/listoflists/ListOfLists")
const Register = () => import("../views/login/register/Register")
const GetCaptcha = () => import("../views/login/getcaptcha/GetCaptcha")
const Login = () => import("../views/login/login/LoginPage")
const routes = [
  {
    path: '/',
    // redirect: '/home',
    component: Home
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
    component: User,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/getcaptcha',
    name: 'GetCaptcha',
    component: GetCaptcha
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
