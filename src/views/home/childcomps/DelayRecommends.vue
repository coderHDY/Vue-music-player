<template>
  <div class = "recommends-box">
    <div class = "recommend" v-for = "(item,index) in recommends" @click = "recommendClick(index)">
      <img :src = "item.iconUrl" @load="imageLoad">
      <div class = "recommend-title">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DelayRecommends",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isEmit:false
      }
    },
    methods: {
      recommendClick(index) {
        console.log("---." + index)
      },
      imageLoad(){
        if(!this.isEmit){
          this.$emit("imageLoad");
          this.isEmit=true
        }
      }
    }
  }
</script>

<style scoped>
  .recommends-box {
    position: relative;
    display: flex;
    height: 10vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
    padding: calc((4vh - 20px) / 2) 0;
    background-color: #fff;
  }

  .recommend {
    flex: 1;
    position: relative;
    height: calc(7vh + 15px);
  }

  .recommend img {
    height: 60%;
    vertical-align: middle;
    margin-bottom: 5px;
    background-color: var(--color-red);
    border-radius: 50%;
  }

  .recommend-title {
    color: var(--color-text);
    font-size: var(--font-small);
  }
</style>
