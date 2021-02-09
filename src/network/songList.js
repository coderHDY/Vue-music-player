import { request } from "./axios";

//获取歌手歌单
export function queryArtistSongs(id) {
  return request({
    url: "/artist/top/song",
    params: {
      id: id
    }
  })
}

//获取歌手个人信息
export function queryArtistInfo(id) {
  return request({
    url: "/artist/desc",
    params: {
      id: id
    }
  })
}

// 获取songList
export function querySongList(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id: id
    }
  })
}

// 获取首页每日推荐歌单
export function getDelaySongs() {
  return request({
    url: "/recommend/songs"
  })
}
//获取每日推荐栏第二个，歌单
export function getNewSongs(){
  return request({
    url:"/personalized/newsong?limit=100"
  })
}
