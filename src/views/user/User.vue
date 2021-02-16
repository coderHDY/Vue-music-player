<template>
  <div class = "user">
    <UserNavBar :title = "title" :isBgCollor = "isBgCollor"/>
    <Scroll class = "scroll"
            ref = "scroll"
            :probeType = "3"
            @scroll = "scroll">
      <TopImg :img = "user&&user.bgImg" class = "top-img" ref = "topImg" @imageLoad = "imageLoad"/>
      <UserInfoMessage :user = "user" ref = "userMessage"/>
      <SongListView :list = "songList" @itemClick = "itemClick"/>
    </Scroll>
  </div>
</template>

<script>
  // 内部调用
  import UserNavBar from "./childcomps/UserNavBar";
  import UserInfoMessage from "./childcomps/UserInfoMessage";
  // 外部调用
  import LoginPage from "../login/login/LoginPage";
  import Scroll from "../../components/common/scroll/Scroll";
  import TopImg from "../../components/common/topimg/TopImg";
  import { getUserSongList, loginStatus, loginStatus2, userDetail } from "../../network/user";
  import { LOGIN } from "../../store/mutations-types";
  import { infoUser, initHomeSongList } from "../../network/types";
  import SongListView from "../../components/content/songlistview/SongListView";
  //   网络调用
  export default {
    name: "User",
    data() {
      return {
        user: null,
        navBarOffset: 0,
        isBgCollor: false,
        songList: []
      }
    },
    components: {
      LoginPage,
      UserNavBar,
      Scroll,
      TopImg,
      UserInfoMessage,
      SongListView
    },
    methods: {
      scroll(position) {
        if (position["y"] > 0) {
          this.$refs.topImg.upBigger(position["y"])
        }
        if (-position["y"] > this.navBarOffset - 44) {
          this.isBgCollor = true
        } else {
          this.isBgCollor = false
        }
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        //从评论开始变色
        this.navBarOffset = this.$refs.userMessage.$el.offsetTop;
      },
      // 配合checkLogin做检查和防网络堵截
      isLogin(res) {
        // console.log(res);
        if (res.toString().indexOf("301") !== -1) {
          this.$router.replace("/login");
        } else {
          userDetail(res.data.profile.userId).then(res => {
            this.$store.commit(LOGIN, infoUser(res));
            this.user = this.$store.state.user;
            getUserSongList(this.user.id).then(res => {
              this.songList = initHomeSongList(res.data.playlist);
            })
          })
        }
        // console.log(res);
      },
      //检查登录状态
      checkLogin() {
        loginStatus().then(res => this.isLogin(res)).catch(() => {
          loginStatus2().then(res => this.isLogin(res))
        })
      },
      itemClick(index) {
        const option = {
          id: this.songList[index].id,
          type: "queryList"
        }
        this.$router.push({
          path: "/songslist",
          query: option
        })
      }
    },
    activated() {
      if (!this.isStoreUser) {
        this.checkLogin()
      } else {
        this.user = this.$store.state.user;
        getUserSongList(this.user.id).then(res => {
          this.songList = initHomeSongList(res.data.playlist);
        })
        this.$refs.scroll.refresh()
      }
    },
    computed: {
      isStoreUser() {
        return this.$store.state.user
      },
      title() {
        return this.isStoreUser ? "欢迎您," + this.$store.state.user.name: "请先登录"
      }
    }
  }
</script>

<style scoped>
  .top-img {
    box-shadow: 0 100px 100px rgba(206, 206, 206, 0.92);
  }

  .user {
    z-index: 1;
  }

  .scroll {
    position: relative;
    top: 0;
    height: calc(100vh - 60px);
    width: 100vw;
    overflow: hidden;
  }
</style>
