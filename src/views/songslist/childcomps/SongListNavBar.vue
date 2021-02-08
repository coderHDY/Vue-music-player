<template>
  <div>
    <NavBar>
      <img src = "~assets/img/common/back_white.svg" slot = "left" class = "right" @click = "back">
      <div slot = "center" class = "center">~{{title}}~</div>
    </NavBar>
  </div>
</template>

<script>

  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "SongListNavBar",
    props: {
      title: {
        type: String,
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
  .right {
    position: relative;
    vertical-align: center;
    padding: 5px;
  }

  .center {
    font-size: var(--font-big);
    font-weight: bolder;
  }
</style>
