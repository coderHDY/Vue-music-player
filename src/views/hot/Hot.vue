<template>
  <div class = "hot">
    <HotNavBar @TabClick = "TabClick"/>
    <Scroll class = "scroll" ref = "scroll">
      <SongListView :list = "showList" @itemClick = "itemClick"/>
    </Scroll>
  </div>
</template>

<script>
  // 内部导入
  import HotNavBar from "./childcomps/HotNavBar";
  // 外部导入
  import Scroll from "../../components/common/scroll/Scroll";
  import SongListView from "../../components/content/songlistview/SongListView";
  //   网络组件
  import { initHot } from "../../network/hot";
  import { initHomeSongList, initSinger } from "../../network/types";

  export default {
    name: "Hot",
    components: {
      HotNavBar,
      Scroll,
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
      TabClick(index) {
        this.current_index = index;
        this.$refs.scroll.scrollTo(0, 0, 300)
        // console.log(index);
      },
      Init() {
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
