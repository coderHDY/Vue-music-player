import { request } from "./axios";
import axios from "axios";

// 登录
export function defaultLogIn() {
  return request({
    url: "/login/cellphone?phone=15542640501&password=Huang7520",
    connections: "keep-alive",
    method: "get",
  })
}

// 轮播图
export function homeSwipeRequest() {
  return request(
    {
      url: "/banner?type=2"
    }
  )
}

//每日推荐栏(拦截响应并格式化)(规避网络检查,写两个方法)
export function delayRecommends() {
  return request(
    {
      url: "/homepage/dragon/ball",
      withCredentials: false
    }
  )
}
export function delayRecommends2(){
  return request(
    {
      url: "/homepage/dragon/ball",
      // withCredentials: false
    }
  )
}
//推荐歌单(规避网络检查)
export function recommendSongList() {
  return request({
    url: "/recommend/resource",
    withCredentials: false
  })
}
export function recommendSongList2(){
  return request({
    url: "/recommend/resource",
    // withCredentials: false
  })
}
// 、热门歌手、网友精选
export function hotArtist(offset = 0, limit = 30) {
  return request({
    url: "/top/artists",
    params: {
      offset: offset,
      limit: limit
    }
  })
}

export function goodSongList(offset = 0, limit = 30) {
  return request({
    url: "/top/playlist",
    params: {
      offset: offset,
      limit: limit,
      order: "hot"
    }
  })
}

// 主页初始化
export function initTypes() {
  return axios.all([ hotArtist(), goodSongList() ])
}

// 、热门歌单
function hotSongList() {
  return request({
    url: "/playlist/hot"
  })
}
