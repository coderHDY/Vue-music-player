<template>
  <div id = "app">
    <keep-alive exclude="SongsList">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/maintabbar/MainTabBar";

  export default {
    name: "app",
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/baseConfig/base.css";
</style>
