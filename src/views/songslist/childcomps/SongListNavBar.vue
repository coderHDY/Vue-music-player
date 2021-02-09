<template>
  <NavBar :class = "{'bg-color':isBgCollor}">
    <img src = "~assets/img/common/back_white.svg" slot = "left" class = "right" @click = "back">
    <div slot = "center" class = "center">歌单</div>
  </NavBar>
</template>

<script>

  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "SongListNavBar",
    props: {
      isBgCollor: {
        type: Boolean,
        default: false
      }
    },
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .bg-color {
    background-color: var(--color-red);
  }

  .right {
    position: relative;
    vertical-align: center;
    padding: 5px;
  }

  .center {
    font-size: var(--font-big);
    font-weight: bolder;
    color: #fff;
  }
</style>
