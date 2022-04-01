import axios from "axios";
import Vue from "vue";

Vue.prototype.axios = axios
axios.defaults.withCredentials = true;  //让ajax携带cookies
export function request(config, func = null) {
  let instance = axios.create({
    baseURL: "/api/",
    timeout: 5000,
    withCredentials: true,
  });
  // //拦截请求器
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   console.log(err)
  // })
  // // 拦截响应器
  instance.interceptors.response.use(res => {
    // res.headers["Access-Control-Allow-Origin"] = "null"; //解决跨域访问问题
    return res
  }, err => {
    console.log(err);
    return err
  })
  return instance(config)
}

