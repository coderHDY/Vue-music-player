<template>
  <div>
    <SongListNavBar :isBgCollor = "isBgCollor"/>
    <Scroll class = "scroll" ref = "scroll"
            :probeType = "3"
            @scroll = "scroll">
      <TopImg :img = "option && option.img" ref = "topImg" @imageLoad = "imageLoad" v-if = "option && option.img"/>
      <ListInfoBox :information = "option" ref = "infoBox"/>
      <ListOfSongs :list = "songsList"/>
    </Scroll>
  </div>
</template>

<script>
  //内部调用
  import SongListNavBar from "./childcomps/SongListNavBar";
  import ListOfSongs from "./childcomps/ListOfSongs";
  import ListInfoBox from "./childcomps/ListInfoBox";
  // 外部调用
  import Scroll from "../../components/common/scroll/Scroll";
  import TopImg from "../../components/common/topimg/TopImg";
  // 网络调用
  import { getDelaySongs, getNewSongs, queryArtistInfo, queryArtistSongs, querySongList } from "../../network/songList";
  import { initHomeSongList, initNewSongs, initSongs } from "../../network/types";
  import { formatDate } from "../../components/common/utils/utils";
  import { searchSongs } from "../../network/home";

  export default {
    name: "SongsList",
    data() {
      return {
        title: "歌单",
        option: null,
        navBarOffset: 0,
        songsList: [],
        isBgCollor: false
      }
    },
    components: {
      SongListNavBar,
      Scroll,
      ListOfSongs,
      ListInfoBox,
      TopImg
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        //从评论开始变色
        this.navBarOffset = this.$refs.infoBox.$el.offsetTop;
      },
      scroll(position) {
        //做navBar
        if (-position["y"] >= this.navBarOffset) {
          this.isBgCollor = true
        } else {
          this.isBgCollor = false
        }
        //做图片放大效果
        if (position["y"] > 0) {
          if (this.$refs.topImg) {
            this.$refs.topImg.upBigger(position["y"])
          }
        }
      },
      querySonger() {
        this.title = this.option.name;
        // 查询歌手的歌单
        queryArtistSongs(this.option.id).then(res => {
          this.songsList = initSongs(res.data.songs)
          this.$set(this.option, "img", this.songsList[0].img) //重点：新增监听
        })
        // 查询基本信息message
        queryArtistInfo(this.option.id).then(res => {
          // this.$set(this.option, "message", res.data.briefDesc) //这个不用set又可以了？
          this.option.message = res.data.briefDesc;
        })
      },
      queryList() {
        querySongList(this.option.id).then(res => {
          this.songsList = initSongs(res.data.playlist.tracks);
          this.$set(this.option, "img", res.data.playlist.coverImgUrl);
          this.$set(this.option, "info", initHomeSongList([ res.data.playlist ])[0])
        })
      },
      queryDelaySongs() {
        getDelaySongs().then(res => {
          const date = Date.parse(new Date());
          const showDate = formatDate(date, "MM-dd");
          this.songsList = initSongs(res.data.data.dailySongs);
          this.$set(this.option, "img", this.songsList[0].img) //重点：新增监听
          this.$set(this.option, "name", showDate + " 每日推荐") //重点：新增监听
        })
      },
      queryNewSongs() {
        getNewSongs().then(res => {
          this.songsList = initNewSongs(res.data.result);
          this.$set(this.option, "img", this.songsList[0].img) //重点：新增监听
          this.$set(this.option, "name", " 新歌推荐") //重点：新增监听
        })
      },
      quertSongs() {
        searchSongs(this.option.keywords).then(res => {
          this.songsList = initSongs(res.data.result.songs);
        })
      }
    },
    created() {
      this.option = this.$route.query;
      switch (this.option.type) {
        case "querySonger":
          this.querySonger()
          break;
        case "queryList":
          this.queryList()
          break;
        case "queryDelaySongs":
          this.queryDelaySongs()
          break;
        case "queryNewSongs":
          this.queryNewSongs()
          break;
        case "searchSong":
          this.quertSongs()
          break;
      }
      this.$bus.$emit("tabBarHidden")
    },
    activated() {
      this.$bus.$emit("tabBarHidden")
      this.$refs.scroll.refresh()
    },
    destroyed() {
      this.$bus.$emit("tabBarShow")
    },
    updated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .scroll {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100vw;
    overflow: hidden;
  }
</style>
