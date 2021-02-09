<template>
  <div>
    <NavBar class = "nav-bar">
      <div class = "back" slot = "left" @click = "back">
        <img src = "~assets/img/common/back.svg">
      </div>
      <div slot = "center">{{title}}</div>
    </NavBar>
    <Scroll class = "scroll">
      <SongListView :list = "list" @itemClick = "itemClick"/>
    </Scroll>
  </div>
</template>

<script>
  // 外部引用
  import SongListView from "../../components/content/songlistview/SongListView";
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  // 网络引用
  import { getListsRank } from "../../network/listOfLists";
  import { initListRank } from "../../network/types";

  export default {
    name: "ListOfLists",
    components: {
      SongListView,
      NavBar,
      Scroll
    },
    data() {
      return {
        title: "歌单榜",
        topImg: "",
        updateFrequency: "不定期更新",
        type: "",
        list: []
      }
    },
    methods: {
      queryRankList() {
        getListsRank().then(res => {
          this.list = initListRank(res.data.list);
          this.title = res.data.artistToplist.name;
          this.updateFrequency = res.data.artistToplist.updateFrequency;
          // console.log(res);
        })
      },
      back() {
        this.$router.back()
      },
      init() {
        this.type = this.$route.query.type;
        switch (this.type) {
          case "queryRankOfLists":
            this.queryRankList();
            break;
          case "11":
            console.log("333");
            break;
          case "22":
            console.log("444");
            break;
        }
      },
      itemClick(index) {
        const option = {
          type: "queryList",
          id: this.list[index].id
        }
        this.$router.push({
          path: "songslist",
          query: option
        })
      }
    },
    created() {
      this.init()
    },
    activated() {
      this.$bus.$emit("tabBarHidden")
    },
    deactivated() {
      this.$bus.$emit("tabBarShow")
    }
  }
</script>

<style scoped>
  .scroll {
    position: relative;
    top: 44px;
    height: calc(100vh - 44px);
  }

  .nav-bar {
    background-color: #fff;
  }

  .back {
    /*position: relative;*/
    /*display: inline-block;*/
    /*text-align: center;*/
  }

  .back img {
    vertical-align: middle;
  }
</style>
