<template>
  <div class = "song-box">
    <div class = "img-box">
      <img :src = "img" class = "song-img">
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayerImg",
    props: {
      img: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style scoped>
  .song-box {
    position: relative;
    margin-top: 44px;
    height: calc(85vh - 44px);
    width: 100vw;
    padding-top: 35%;
  }

  .img-box {
    position: relative;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    border: 20px solid rgba(113, 113, 113, 0.8);
    width: 40vw;
    height: 40vw;
    background-color: rgba(255, 0, 25, 0.59);
    overflow: hidden;
  }

  .song-img {
    position: relative;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
</style>
