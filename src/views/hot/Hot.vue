<template>
  <div class = "hot">
    <HotNavBar @tabClick = "tabClick" ref = "navBar" :current_index = "current_index"/>
    <SwiperScroll @tabClick = "tabClick" ref = "swiperScroll">
      <Scroll class = "scroll" slot = "one" ref = "scroll">
        <SongListView :list = "list.hotLists" @itemClick = "itemClick"/>
      </Scroll>
      <Scroll class = "scroll" slot = "two" ref = "scroll2">
        <SongListView :list = "list.hotSinger" @itemClick = "itemClick"/>
      </Scroll>
    </SwiperScroll>
  </div>
</template>

<script>
  // 内部导入
  import HotNavBar from "./childcomps/HotNavBar";
  // 外部导入
  import Scroll from "../../components/common/scroll/Scroll";
  import SongListView from "../../components/content/songlistview/SongListView";
  import SwiperScroll from "../../components/common/swiperscroll/SwiperScroll";
  //   网络组件
  import { initHot } from "../../network/hot";
  import { initHomeSongList, initSinger } from "../../network/types";

  export default {
    name: "Hot",
    components: {
      HotNavBar,
      Scroll,
      SwiperScroll,
      SongListView
    },
    data() {
      return {
        list: {
          hotLists: [],
          hotSinger: []
        },
        current_index: 0
      }
    },
    methods: {
      tabClick(index) {
        this.current_index = index;
        this.$refs.swiperScroll.swiperChange(index)
      },
      Init() {
        if (!this.$store.state.user) {
          this.$router.replace("/home")
        }
        initHot().then(res => {
          this.list.hotLists = initHomeSongList(res[0].data.result);
          this.list.hotSinger = initSinger(res[1].data.list.artists);
        })
      },
      itemClick(index) {
        const options = {
          type: this.queryType,
          id: this.showList[index].id,
          name: this.showList[index].name
        }
        this.$router.push({
          path: "songslist",
          query: options
        })
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll2.refresh()
    },
    computed: {
      showList() {
        return this.current_index === 0 ? this.list["hotLists"]: this.list["hotSinger"]
      },
      queryType() {
        return this.current_index === 0 ? "queryList": "querySonger"
      }
    },
    created() {
      this.Init()
    }
  }
</script>

<style scoped>
  .scroll {
    position: absolute;
    top: 44px;
    height: calc(100vh - 104px);
  }
</style>
