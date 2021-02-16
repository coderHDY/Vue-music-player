<template>
  <div class = "list-box">
    <div v-for = "(item,index) in list" class = "item-box" @click = "playSong(index)">
      <span class = "index">{{index+1}}</span>
      <div class = "info-box">
        <div class = "title">{{item.name}}</div>
      </div>
      <div class = "singer-box">--{{item.singer}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListOfSongs",
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      playSong(index) {
        this.$store.dispatch("play", { list: this.list, index: index })
        this.$bus.$emit("playerShow")
      }
    }
  }
</script>

<style scoped>
  .list-box {
    display: block;
    position: relative;
    width: 100vw;
    margin-top: 10px;
  }

  .item-box {
    position: relative;
    display: block;
    margin-top: 2px;
    width: 100%;
    height: 10vh;
    background-color: #fff;
  }

  .index {
    display: inline-block;
    position: relative;
    width: 8vh;
    height: 100%;
    line-height: 10vh;
    color: var(--color-text-dust);
    text-align: center;
  }

  .info-box {
    position: relative;
    display: inline-block;
    width: calc(100vw - 10vh);
    vertical-align: middle;
  }

  .title {
    display: inline-block;
    position: relative;
    font-weight: bolder;
    font-size: var(--font-big);
    color: #000000;
  }

  .singer-box {
    position: absolute;
    display: block;
    right: 20px;
    bottom: 1px;
    font-size: var(--font-small);
    z-index: 6;
  }
</style>
