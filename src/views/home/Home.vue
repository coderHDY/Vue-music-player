<template>
  <div class = "home">
    <HomeNavBar :placeholder = "defaultKeyword"/>
    <TabControl id = "hidden-bar" class = "home-tab-control"
                :items = "items" @tabClick = "tabClick"
                ref = "bar1" v-show = "isShowTopBar"/>
    <Scroll class = "scroll" :probe-type = "3"
            :pull-up-load = "true"
            @pullingUp = "pullUpload"
            @scroll = "scroll"
            ref = "scroll">
      <Swiper :banners = "banners" @imageLoad = "imageLoad" ref = "swiper"/>
      <DelayRecommends :recommends = "recommends"
                       @queryRankOfLists = "queryRankOfLists"
                       @imageLoad = "imageLoad"
                       @queryList = "queryList"/>
      <RecommendList :recommendSongList = "recommendSongList" @imageLoad = "imageLoad" @queryList = "queryList"/>
      <TabControl class = "home-tab-control" :items = "items" @tabClick = "tabClick" ref = "bar2"/>
      <HomeTypeList :type-list = "typeList[current_index].list" :current_index = "current_index"
                    @queryList = "queryList"/>
    </Scroll>
  </div>
</template>

<script>
  // 内部引用
  import HomeNavBar from "./childcomps/HomeNavBar";
  import DelayRecommends from "./childcomps/DelayRecommends";
  import RecommendList from "./childcomps/RecommendList";
  import HomeTypeList from "./childcomps/HomeTypeList";
  // 外部引用
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/common/tabcontrol/TabControl";
  import Swiper from "../../components/common/swiper/mySwiper"
  // 网络引用
  import {
    defaultSearch,
    delayRecommends,
    delayRecommends2,
    goodSongList,
    homeSwipeRequest,
    hotArtist,
    initTypes,
    recommendSongList,
    recommendSongList2
  } from "../../network/home";
  import { infoUser, initHomeSongList, initSinger } from "../../network/types";
  import { loginStatus, loginStatus2, logout, userDetail } from "../../network/user";
  import { LOGIN } from "../../store/mutations-types";

  export default {
    name: "Home",
    data() {
      return {
        items: [ "热门歌手", "网友精选" ],
        banners: [],
        recommends: [],
        recommendSongList: [],
        typeList: {
          0: {     //"热门歌手"
            list: [],
            limit: 30,
            offset: 30 //偏移直接30，加上初始数据
          },
          1: {       //"网友精选"
            list: [],
            limit: 30,
            offset: 30
          }
        },
        contBarOffset: 0,
        current_index: 0,
        isShowTopBar: false,
        defaultKeyword: ""
      }
    },
    // region
    components: {
      HomeNavBar,
      Swiper,
      Scroll,
      DelayRecommends,
      RecommendList,
      TabControl,
      HomeTypeList,
    },
    // endregion
    methods: {
      tabClick(index) {
        this.current_index = index;
        this.$refs.bar1.current_index = index;
        this.$refs.bar2.current_index = index;
        this.$refs.scroll.scroll.scrollTo(0, -this.contBarOffset, 300)
      },
      // 上拉加载更多
      pullUpload() {
        const offset = this.typeList[this.current_index].offset;
        const limit = this.typeList[this.current_index].limit;
        if (this.current_index === 0) {
          hotArtist(offset, limit)
            .then(res => {
              this.typeList['0'].offset += limit;
              this.typeList['0'].list.push(...initSinger(res.data.artists))
            })
        } else if (this.current_index === 1) {
          goodSongList(offset, limit)
            .then(res => {
              this.typeList[1].offset += limit;
              this.typeList[1].list.push(...initHomeSongList(res.data.playlists))
            })
        }
      },
      // 配合checkLogin做检查和防网络堵截
      isLogin(res) {
        // console.log(res);
        if (res.toString().indexOf("301") !== -1) {
          this.$router.replace("/login");
        } else {
          userDetail(res.data.profile.userId).then(res => {
            this.$store.commit(LOGIN, infoUser(res))
            this.initData()
          })
        }
        // console.log(res);
      },
      //检查登录状态
      checkLogin() {
        loginStatus().then(res => this.isLogin(res)).catch(() => {
          loginStatus2().then(res => this.isLogin(res)).catch(() => {
            logout()
            this.$router.replace("/login");
          })
        })
      },
      // 初始化数据
      initData() {
        recommendSongList().then(res => {
          this.recommendSongList = res.data.recommend
        }).catch(() => {
          recommendSongList2().then(res => {
            this.recommendSongList = res.data.recommend
          })
        });
        //轮播图数据
        homeSwipeRequest().then(res => {
          this.banners = res.data.banners
        });
        //每日推荐的三个数据
        delayRecommends().then(res => {
          this.recommends = res.data.data.splice(0, 3);
        }).catch(() => {
          delayRecommends2().then(res => {
            this.recommends = res.data.data.splice(0, 3);
          })
        })
        initTypes().then(res => {
          this.typeList[0].list = initSinger(res[0].data.artists);
          this.typeList[1].list = initHomeSongList(res[1].data.playlists);//已经格式化
        })
      },
      //计算offset
      imageLoad() {
        this.contBarOffset = this.$refs.bar2.$el.offsetTop
      }
      ,
      scroll(position) {
        this.isShowTopBar = -position.y > this.contBarOffset;
      },
      queryList(option) {
        //搜索哪种类型由 option 里的 type 决定
        this.$router.push({
          path: "songslist",
          query: option
        })
      },
      queryRankOfLists(options) {
        this.$router.push({
          path: "listoflists",
          query: options
        })
      },
      getdefaultSearch() {
        defaultSearch().then(res => {
          this.defaultKeyword = res.data.data.realkeyword;
        })
      }
    },
    created() {
      this.checkLogin()
      this.getdefaultSearch()
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.swiper.reloadSwiper()
    }
  }
</script>

<style scoped>
  .scroll {
    position: absolute;
    top: 44px;
    /*height: calc(100vh - 104px);*/
    height: calc(100vh - 124px);
    width: 100vw;
    overflow: hidden;
  }

  .home-tab-control {
    height: 40px;
    line-height: 40px;
    font-size: var(--font-small);
    background-color: #fff;
    border-bottom: 1px solid rgba(243, 243, 243, 0.78);
  }

  #hidden-bar {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>
