<template>
  <div>
    <div class = "img-box" ref = "topImage" style = "width: 100vw;top:0">
      <img :src = "information.img" class = "img" @load = "imageLoad">
      <span class = "mark" v-if = "information.mark">{{information.mark}}</span>
    </div>
    <div class = "message-box" ref = "messageBox">
      <div class = "description">{{information.message}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListInfoBox",
    props: {
      information: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    methods: {
      imageLoad() {
        this.$emit("imageLoad")
      }
    }
  }
</script>

<style scoped>
  .img-box {
    position: relative;
  }

  .out-top {
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }

  .img {
    width: 100%;
  }

  .mark {
  }

  .message-box {
    position: relative;
    padding: 10px 5px;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(255, 166, 154, 0.97);
    font-size: var(--font-small);
    line-height: 20px;
  }

</style>
