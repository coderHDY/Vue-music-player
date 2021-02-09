import {request} from "./axios";
//歌单列表获取
export function getListsRank(){
  return request({
    url:"/toplist"
  })
}
