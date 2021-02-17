<template>
  <NavBar class = "nav-bar">
    <img src = "~assets/img/common/music.svg" slot = "left" class = "music-img" @click = "showPlay"/>
    <div slot = "center">
      <TabControl :items = "items" @tabClick = "tabClick" ref = "controller"/>
    </div>
    <img slot = "right" src = "~assets/img/common/music.svg" class = "music-img" @click = "showPlay"/>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  import TabControl from "../../../components/common/tabcontrol/TabControl";

  export default {
    name: "HotNavBar",
    components: {
      NavBar,
      TabControl
    },
    props: {
      current_index: 0
    },
    data() {
      return {
        items: [ "私人订制", "流行歌手" ]
      }
    },
    methods: {
      tabClick(index) {
        this.$emit("tabClick", index)
      },
      showPlay() {
        // this.$toast.show("去音乐界面", 1500)
        this.$bus.$emit("playerShow")
      }
    },
    watch: {
      current_index() {
        this.$refs.controller.current_index = this.current_index
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #fff;
  }

  .music-img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }
</style>
