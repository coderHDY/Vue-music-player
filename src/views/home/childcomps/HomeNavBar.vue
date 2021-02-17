<template>
  <NavBar>
    <img @click = "showPlay" slot = "left" src = "~assets/img/common/music.svg" class = "setting-img"/>
    <!--    <button @click = "showSearch" type = "button" slot = "center"-->
    <!--            class = "search-box">-->
    <!--      {{placeholder}}-->
    <!--    </button>-->
    <input class = "search-box" slot = "center" type = "text" v-model = "keywords"
           :placeholder = "placeholder"
           @keyup.enter = "search">
    <img @click = "showPlay" slot = "right" src = "~assets/img/common/music.svg" class = "music-img"/>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "HomeNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        keywords: ""
      }
    },
    props: {
      placeholder: {
        type: String,
        default: "周杰伦"
      }
    },
    methods: {
      showPlay() {
        this.$bus.$emit("playerShow")
      },
      showSearch() {
        this.$emit("showSearch")
      },
      search() {
        if (this.keywords.trim() === "") {
          this.$toast.show("搜索不能为空")
        } else {
          this.$router.push({
            path: "songslist",
            query: {
              type: "searchSong",
              keywords: this.keywords
            }
          })
        }
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
    line-height: 30px;
    padding-left: 17%;
    background-position: 10%;
    background-size: 20px 20px;
    border-radius: 22px;
    color: var(--color-text-dust);
  }

  .search-box:focus {
    outline: none;
  }
</style>
