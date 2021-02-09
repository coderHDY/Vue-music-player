import { request } from "./axios";
import axios from "axios";

export function initHot() {
  return axios.all([ getHotSongList(), getHotSinger() ])
}

function getHotSinger() {
  return request({
    url: "/toplist/artist"
  })
}

function getHotSongList() {
  return request({
    url: "/personalized?limit=50"
  })
}
