import { request } from "./axios";

//获取歌手歌单
export function queryArtistSongs(id) {
  return request({
    url: "/artist/top/song?id=6452",
    id: id
  })
}
