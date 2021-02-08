//歌手对象
class Singer {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img
  }
}

//封装歌手Array
export function initSinger(res) {
  const singers = [];
  res.forEach(item => {
    const singer = new Singer(item.id, item.name, item.picUrl)
    singers.push(singer)
  })
  return singers
}

// 歌曲对象
class Song {
  constructor(id, name, img, url, singer, singerId, count) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.singer = singer;
    this.singerId = singerId;
    this.count = count;
  }
}

// 歌单简介对象
class SongList {
  constructor(id, name, img, copywriter, count, createTime, author, authorId, authorImg) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.count = count;
    this.createTime = createTime;
    this.author = author;
    this.authorId = authorId;
    this.copywriter = copywriter;
    this.authorImg = authorImg;
  }
}

//封装主页推荐歌单Array对象、首页热门歌单对象
export const initHomeSongList = function (res) {
  const songLists = [];
  for (let item of res) {
    const songList = new SongList(item.id, item.name, item.picUrl || item.coverImgUrl,
      item.copywriter || item.description, item.playcount || item.playCount,
      item.createTime, item.creator.nickname, item.creator.userId, item.creator.backgroundUrl)
    songLists.push(songList)
  }
  // 将返回数据封装成对象后再使用
  return songLists
}
