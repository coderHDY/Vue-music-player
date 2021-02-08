<template>
  <div>
    <SongListNavBar :title = "title" :isBgCollor = "isBgCollor"/>
    <Scroll class = "scroll" ref = "scroll"
            :probeType = "3"
            @scroll = "scroll">
      <ListInfoBox :information = "option" @imageLoad = "imageLoad" ref = "infoBox"/>
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
  import { queryArtistInfo, queryArtistSongs } from "../../network/songList";
  import { initSongs } from "../../network/types";
  // 网络调用
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
      ListInfoBox
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        //从评论开始变色
        this.navBarOffset = this.$refs.infoBox.$refs.messageBox.offsetTop;
      },
      scroll(position) {
        //做navBar
        if (-position["y"] > this.navBarOffset - 44) {
          // console.log(-position["y"]);
          this.isBgCollor = true
        } else {
          this.isBgCollor = false
        }
        //做图片放大效果
        if (position["y"] > 0) {
          this.$refs.infoBox.$refs.topImage.style.width = "calc(100vw + " + position['y'] / 2 + "px)";
          this.$refs.infoBox.$refs.topImage.style.top = "-" + (position['y'] + 1) + "px";
          if (this.$refs.infoBox.$refs.topImage.className.indexOf(" out-top") === -1) {
            this.$refs.infoBox.$refs.topImage.className += " out-top"
          }
        } else {
        }
      }
    },
    created() {
      this.option = this.$route.query;
      if (this.option.type === "querySonger") {
        this.title = this.option.name;
        // 查询歌手的歌单
        queryArtistSongs(this.option.id).then(res => {
          this.songsList = initSongs(res.data.songs)
          this.$set(this.option, "img", this.songsList[0].img) //重点：新增监听
        })
        // 查询基本信息message
        queryArtistInfo(this.option.id).then(res => {
          this.option.message = res.data.briefDesc;
        })
      }
    },
    activated() {
      this.$refs.scroll.refresh()
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
    bottom: 60px;
    width: 100vw;
    overflow: hidden;
  }
</style>
