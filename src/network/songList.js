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
