import { request } from "./axios";
import axios from "axios";

// 获取url
function getSongUrl(id) {
  return request({
    url: "/song/url",
    params: {
      id: id
    }
  })
}

// 获取详情信息
function getSongInfo(id) {
  return request({
    url: "/song/detail",
    params: {
      ids: id
    }
  })
}

export function getSongDetail(id) {
  return axios.all([ getSongUrl(id), getSongInfo(id) ])
}

// 获取评论
export function getcomment(id, limit = 30, offset = 0) {
  return request({
    url: "/comment/music",
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  })
}

// 评论该歌曲
export function setcomment({ t = 1, type = 1, id, content }) {
  return request({
    url: "/comment",
    params: {
      id: id,
      t: t,
      type: type,
      content: content
    }
  })
}

// 评论该歌曲
export function likeSong({ id }) {
  return request({
    url: "/like",
    params: {
      id: id
    }
  })
}
