<template>
  <div class = "type-list">
    <div class = "item-box" v-for = "(item,index) in list" :key = "index" @click = "itemClick(index)">
      <span class = "number">{{index+1}}</span>
      <div class = "item-img-box">
        <img v-lazy = "item.img" class = "item-img">
      </div>
      <div class = "item-name">{{item.name}}</div>
      <div v-if = "item.author" class = "author">--{{item.author}}</div>
    </div>
  </div>
</template>

<script>
  // 需要有音乐列表的结构数组
  export default {
    name: "SongListView",
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        this.$emit("itemClick", index)
      }
    }
  }
</script>

<style scoped>
  .type-list {
    position: relative;
    width: 100vw;
  }

  .item-box {
    position: relative;
    display: block;
    height: 15vh;
    width: 100%;
    padding-left: 5px;
    margin-top: 1px;
    background-color: #fff;
    overflow: hidden;
    word-wrap: normal;
  }

  .number {
    display: inline-block;
    width: 5vh;
    text-align: center;
    vertical-align: center;
    margin-right: 3px;
    font-size: var(--font-big);
    font-family: 华文行楷;
    color: var(--color-red);
    text-shadow: 1px 2px 3px rgb(255, 120, 186);
    border-right: 1px solid rgb(255, 193, 229);
  }

  .item-img-box {
    display: inline-block;
    height: 13vh;
    width: 13vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    vertical-align: middle;
    margin-right: 5px;
    border-radius: 20px;
    overflow: hidden;
  }

  .item-img {
    height: 100%;
    width: auto;
    vertical-align: middle;
  }

  .item-name {
    display: inline-block;
    position: relative;
    width: calc(100vw - 18vh - 20px);
    line-height: 20px;
    vertical-align: middle;
    word-wrap: break-word;
  }

  .author {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: var(--font-small);
  }
</style>
