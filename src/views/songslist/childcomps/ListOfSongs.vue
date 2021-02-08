<template>
  <div class = "list-box">
    <div v-for = "(item,index) in list" class = "item-box">
      <span class = "index">{{index+1}}</span>
      <div class = "info-box">
        <div class = "title">{{item.name}}</div>
        <div class = "singer-box">--{{item.singer}}</div>
      </div>
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
    height: 8vh;
    background-color: #fff;
  }

  .index {
    display: inline-block;
    position: relative;
    width: 8vh;
    height: 8vh;
    line-height: 8vh;
    color: var(--color-text-dust);
    text-align: center;
    /*vertical-align: top;*/
  }

  .info-box {
    position: relative;
    display: inline-block;
    height: 100%;
    line-height: 100%;
  }

  .title {
    display: inline-block;
    position: relative;
    font-weight: bolder;
    font-size: var(--font-big);
    color: #000000;
  }

  .singer-box {
    display: inline-block;
    position: relative;
    margin-left: 10px;
    font-size: var(--font-small);
  }
</style>
