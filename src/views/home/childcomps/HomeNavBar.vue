<template>
  <NavBar>
    <img slot = "left" src = "~assets/img/common/more_menu.svg" class = "setting-img"/>
    <input type = "button" slot = "center" name = "search-box" :value = "placeholder" class = "search-box"/>
    <img slot = "right" src = "~assets/img/common/music.svg" class = "music-img"/>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "HomeNavBar",
    components: {
      NavBar
    },
    props: {
      placeholder: {
        type: String,
        default: "周杰伦"
      }
    }
  }
</script>

<style scoped>
  .music-img, .setting-img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  .search-box {
    width: 95%;
    height: 75%;
    border: none;
    background-color: #fff;
    background-image: url("../../../assets/img/common/search.svg");
    background-repeat: no-repeat;
    background-position: 20%;
    background-size: 20px 20px;
    border-radius: 22px;
    color: var(--color-text-dust);
  }

  .search-box:focus {
    outline: none;
  }
</style>
