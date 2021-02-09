<template>
  <div class = "img-box" ref = "topImage" style = "width: 100vw;top:0">
    <img :src = "img" class = "img" @load = "imageLoad">
  </div>
</template>

<script>
  export default {
    name: "TopImg",
    props: {
      img: ""
    },
    methods: {
      imageLoad() {
        this.$emit("imageLoad")
      },
      upBigger(y) {
        this.$refs.topImage.style.width = "calc(100vw + " + y / 2 + "px)";
        this.$refs.topImage.style.top = "-" + (y + 1) + "px";
      }
    }
  }
</script>

<style scoped>
  .img-box {
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }

  .img {
    width: 100%;
  }

</style>
