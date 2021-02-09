<template>
  <tab-bar v-if="isShow">
    <tab-bar-item link = "/home">
      <img src = "~assets/img/common/hert_dust.svg" slot = "item-icon">
      <img src = "~assets/img/common/hert_red.svg" slot = "item-icon-active">
      <div slot = "item-name">发现</div>
    </tab-bar-item>
    <tab-bar-item link = "/hot">
      <img src = "~assets/img/common/telev.svg" slot = "item-icon">
      <img src = "~assets/img/common/telev_red.svg" slot = "item-icon-active">
      <div slot = "item-name">热门</div>
    </tab-bar-item>
    <tab-bar-item link = "/user">
      <img src = "~assets/img/common/user.svg" slot = "item-icon">
      <img src = "~assets/img/common/user_red.svg" slot = "item-icon-active">
      <div slot = "item-name">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    data() {
      return {
        isShow: true
      }
    },
    components: {
      TabBar,
      TabBarItem
    },
    methods:{
      show(){
        this.isShow=true
      },
      hidden(){
        this.isShow=false
      }
    },
    mounted() {
      this.$bus.$on("tabBarShow",()=>this.show())
      this.$bus.$on("tabBarHidden",()=>this.hidden())
    }
  }
</script>

<style scoped>
</style>
