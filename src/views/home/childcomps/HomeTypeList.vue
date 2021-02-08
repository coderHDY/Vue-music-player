<template>
  <div class = "type-list">
    <div class = "item-box" v-for = "(item,index) in typeList" :key = "index" @click = "itemClick(index)">
      <span class = "number">{{index+1}}</span>
      <div class = "item-img-box">

        <img :src = "item.img" class = "item-img">
      </div>
      <div class = "item-name">{{item.name}}</div>
      <div v-if = "item.copywriter" class = "item-copywriter">{{item.copywriter}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeTypeList",
    props: {
      //判断类型的index
      current_index: {
        type: Number,
        required: true
      },
      typeList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        // 赋值正确的配置
        const option = {
          type: this.current_index === 0 ? "querySonger": "queryList",
          id: this.typeList[index].id
        };
        this.$emit("queryList", option)
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
</style>
