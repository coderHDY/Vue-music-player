import { request } from "./axios";

// 检查登录状态
export function loginStatus() {
  return request({
    url: "/login/status",
    connections: "keep-alive",
    method: "get"
  })
}

// 检查登录状态(防网络堵截)
export function loginStatus2() {
  return request({
    url: "/login/status",
    connections: "keep-alive",
    withCredentials: false,
    method: "get"
  })
}

// 获取用户详情
export function userDetail(userId) {
  return request({
    url: "/user/detail",
    connections: "keep-alive",
    method: "get",
    params: {
      uid: userId
    }
  })
}

// 手机登录
export function phoneLogIn(account, password) {
  return request({
    url: "/login/cellphone",
    connections: "keep-alive",
    method: "post",
    params: {
      phone: account,
      password: password
    }
  })
}

// 邮箱登录
export function emailLogIn(account, password) {
  return request({
    url: "/login",
    connections: "keep-alive",
    method: "post",
    params: {
      email: account,
      password: password
    }
  })
}

// 检测手机号是否被注册
export function checkPhone(phone) {
  return request({
    url: "/cellphone/existence/check",
    connections: "keep-alive",
    method: "post",
    params: {
      phone: phone
    }
  })
}

// 发送验证码
export function sendCaptcha(phone) {
  return request({
    url: "captcha/sent",
    connections: "keep-alive",
    method: "get",
    params: {
      phone: phone
    }
  })
}

// 注册
export function register({ nickname, account, password, captcha }) {
  return request({
    url: "/register/cellphone",
    connections: "keep-alive",
    method: "post",
    params: {
      phone: account,
      password: password,
      captcha: captcha,
      nickname: nickname,
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: "/logout",
    // connections: "keep-alive",
    method: "get"
  })
}

// 获取用户歌单
export function getUserSongList(id) {
  return request({
    url: "/user/playlist",
    // connections: "keep-alive",
    method: "get",
    params: {
      uid: id
    }
  })
}

// 查询城市
//
// export function getCity(areacode) {
//   return axios({
//     url: "http://tools.fuwuce.com/idcard/areacode.jsp",
//     connections: "keep-alive",
//     method: "post",
//     query: {
//       areacode: areacode
//     }
//   })
// }
