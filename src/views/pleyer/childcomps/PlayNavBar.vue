<template>
  <NavBar>
    <img @click = "showPlay" slot = "left" src = "../../../assets/img/common/back_white.svg" class = "setting-img"/>
    <div slot = "center" class = "name">{{name}}</div>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "PlayNavBar",
    components: {
      NavBar
    },
    props: {
      name: {
        type: String,
        default: "欢迎收听"
      }
    },
    methods: {
      showPlay() {
        this.$bus.$emit("playerHidden")
      }
    }
  }
</script>

<style scoped>
  .setting-img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  .name {
    font-size: var(--font-big);
    color: #fff;
  }
</style>
