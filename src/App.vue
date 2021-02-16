<template>
  <div id = "app">
    <keep-alive exclude = "SongsList,Home">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
    <Player/>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/maintabbar/MainTabBar";
import Player from "./views/pleyer/Player";
  export default {
    name: "app",
    components: {
      MainTabBar,
      Player
    }
  }
</script>

<style>
  @import "assets/css/baseConfig/base.css";
</style>
