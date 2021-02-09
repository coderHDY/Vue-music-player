<template>
  <NavBar class = "nav-bar">
    <div slot = "left" class = "back">
      <img src = "~assets/img/common/more_menu.svg">
    </div>
    <div slot = "center">
      <TabControl :items = "items" @TabClick = "TabClick"/>
    </div>
    <img slot = "right" src = "~assets/img/common/music.svg" class = "music-img"/>
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
    data() {
      return {
        items: [ "私人订制", "流行歌手" ]
      }
    },
    methods: {
      TabClick(index) {
        this.$emit("TabClick", index)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #fff;
  }

  .back img, .music-img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }
</style>
