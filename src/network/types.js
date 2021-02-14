//歌手对象
class Singer {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img
  }
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

//封装歌手函数
export function initSinger(res) {
  const singers = [];
  res.forEach(item => {
    const singer = new Singer(item.id, item.name, item.picUrl)
    singers.push(singer)
  })
  return singers
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

// 用户对象
class User {
  constructor({ id, name, img, bgImg, birth, city, loginType, createTime, createDays, listenSongs }) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.bgImg = bgImg;
    this.birth = birth;
    this.city = city;
    this.loginType = loginType;
    this.createTime = createTime;
    this.createDays = createDays;
    this.listenSongs = listenSongs
  }
}

//封装用户函数
export const infoUser = function (res) {
  // console.log();
  // console.log(res.data.createTime && res.data.createTime.toString().slice(0, res.data.createTime.toString().length - 3));
  const user = new User({
    id: res.data.account && res.data.account.id || res.data.profile.userId,
    name: res.data.profile.nickname,
    img: res.data.profile.avatarUrl,
    bgImg: res.data.profile.backgroundUrl,
    birth: res.data.profile.birthday,
    city: res.data.profile.city,
    loginType: res.data.loginType,
    createTime: res.data.createTime && res.data.createTime,
    createDays: res.data.createDays,
    listenSongs: res.data.listenSongs,
  })
  return user
}
// 封装我的歌单对象
// class myList{
//   constructor({id,name,img,description="",playCount,}) {
//     this.id=id;
//     this.name=name;
//     this.img=img;
//     this.description=description;
//     this.playCount=playCount
//   }
// }
