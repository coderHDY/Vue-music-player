//歌手对象
class Singer {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img
  }
}

//封装歌手函数
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
  constructor({ id, name, img, alId, alName, singer, singerId, mark }) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.alId = alId;
    this.alName = alName;
    this.singer = singer;
    this.singerId = singerId;
    this.mark = mark;
  }
}

//封装新歌曲函数（返回数据和前面不一样，没办法)
export function initNewSongs(res) {
  const songs = [];
  res.forEach(item => {
    const song = new Song({
      id: item.id,
      name: item.name,
      img: item.picUrl,
      singer: item.song.artists[0].name,
      singerId: item.song.artists[0].id
    });
    songs.push(song)
  });
  return songs
}

// 封装歌单里的歌曲函数
export function initSongs(res) {
  const songs = [];
  res.forEach(item => {
    const song = new Song({
      id: item.id,
      name: item.name,
      img: item.al.picUrl,
      alId: item.al.id,
      alName: item.al.name,
      singer: item.ar[0].name,
      singerId: item.ar[0].id,
      mark: item.mark
    })
    songs.push(song)
  });
  return songs
}

// 歌单简介对象
class SongList {
  constructor({ id, name, img, copywriter, count, createTime, author, authorId, authorImg, updateFrequency = "每周更新", updateTime }) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.count = count;
    this.createTime = createTime;
    this.author = author;
    this.authorId = authorId;
    this.copywriter = copywriter;
    this.authorImg = authorImg;
    this.updateFrequency = updateFrequency;
    this.updateTime = updateTime
  }
}

// 排行榜歌单封装函数
export function initListRank(res) {
  const rank = [];
  res.forEach(item => {
    const songsList = new SongList({
      id: item.id,
      name: item.name,
      img: item.coverImgUrl,
      copywriter: item.description,
      count: item.playCount,
      createTime: item.createTime,
      updateFrequency: item.updateFrequency,
      updateTime: item.updateTime
    })
    rank.push(songsList)
  })
  return rank
}

//封装主页推荐歌单Array对象、首页热门歌单对象
export const initHomeSongList = function (res) {
  const songLists = [];
  for (let item of res) {
    const songList = new SongList({
      id: item.id,
      name: item.name,
      img: item.coverImgUrl || item.picUrl,
      copywriter: item.copywriter || item.description,
      count: item.playcount || item.playCount,
      createTime: item.createTime,
      author: item.creator && item.creator.nickname || null,
      authorId: item.creator && item.creator.userId || null,
      authorImg: item.creator && item.creator.coverImgUrl || item.creator && item.creator.backgroundUrl || null
    })
    songLists.push(songList)
  }
  // 将返回数据封装成对象后再使用
  return songLists
}
