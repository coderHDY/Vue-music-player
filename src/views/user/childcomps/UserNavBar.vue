<template>
  <NavBar class = "nav-bar">
    <img src = "../../../assets/img/common/more_menu.svg" slot = "left" @click = "showPlay" class = "setting"/>
    <div slot = "center">{{title}}</div>
    <img src = "../../../assets/img/common/music.svg" slot = "right" class = "music-img"/>
  </NavBar>
</template>

<script>

  // 外部调用
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "UserNavBar",
    components: {
      NavBar
    },
    props: {
      title: String
    },
    methods: {
      showPlay() {
        this.$toast.show("去音乐界面", 1500)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: absolute;
    top: 0;
    color: var(--color-text-dust);
  }

  .setting, .music-img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }
</style>
