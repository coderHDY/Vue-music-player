<template>
  <NavBar class = "nav-bar">
    <img src = "../../../../../assets/img/common/back.svg" slot = "left" @click = "hidden">
    <div slot = "center">{{name}}({{total}}条)</div>
  </NavBar>
</template>

<script>
  import NavBar from "../../../../../components/common/navbar/NavBar";

  export default {
    name: "CommentNavBar",
    props: {
      total: 0
    },
    data() {
      return {
        name: this.$store.state.playingSong.name
      }
    },
    components: {
      NavBar
    },
    methods: {
      hidden() {
        this.$emit("commentHidden")
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #fff;
  }
</style>
