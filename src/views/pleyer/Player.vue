<template>
  <transition name = "fade">
    <div class = "music-player" v-show = "isShow">
      <PlayNavBar :name = "playingSong.name"/>
      <PlayerImg :img = "playingSong.img"/>
      <PlayerAudio :url = "playingSong.url" @goComment = "goComment"/>
      <Comment ref = "comment"/>
    </div>
  </transition>
</template>

<script>
  import PlayNavBar from "./childcomps/PlayNavBar";
  import PlayerImg from "./childcomps/PlayerImg";
  import PlayerAudio from "./childcomps/PlayerAudio";
  import Comment from "./childcomps/comment/Comment";

  export default {
    name: "Player",
    data() {
      return {
        isShow: false
      }
    },
    components: {
      PlayNavBar,
      PlayerImg,
      PlayerAudio,
      Comment
    },
    computed: {
      playingSong() {
        return this.$store.state.playingSong || {}
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hidden() {
        this.isShow = false
      },
      goComment() {
        this.$refs.comment.show()
      }
    },
    created() {
      this.$bus.$on("playerShow", () => this.show())
      this.$bus.$on("playerHidden", () => this.hidden())
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s !important;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0 !important;
  }

  .music-player {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(156, 156, 156);
    overflow: hidden;
    z-index: 10;
  }
</style>
