<template>
  <div class = "audio-box">
    <div class = "info-box">
      <img src = "../../../assets/img/player/like_white.svg" class = "component"/>
      <img src = "../../../assets/img/player/comment_white.svg" class = "component"/>
      <img src = "../../../assets/img/player/download.svg" class = "component"/>
    </div>
    <div class = "time-control">
      <div class = "current-time">{{currentTime | musicTime}}</div>
      <div class = "time-bar" ref = "timeBar" @click = "timeBarClick">
        <hr class = "time-now" style = "right: 100%" ref = "timeNow"/>
        <hr class = "time-last"/>
      </div>
      <div class = "all-time">{{allTime | musicTime}}</div>
    </div>
    <audio :src = "url" autoplay ref = "audio"/>
    <div class = "music-control">
      <div class = "control-item" @click = "changeMode">
        <img src = "../../../assets/img/player/loop.svg" v-if = "mode===0">
        <img src = "../../../assets/img/player/order.svg" v-else-if = "mode===1">
        <img src = "../../../assets/img/player/rand.svg" v-else-if = "mode===2">
      </div>
      <div class = "control-item" @click = "lastClick">
        <img src = "../../../assets/img/player/last.png">
      </div>
      <div class = "control-item-big" @click = "pauseControl">
        <img src = "../../../assets/img/player/on.svg" v-if = "playing===1">
        <img src = "../../../assets/img/player/off.svg" v-else>
      </div>
      <div class = "control-item" @click = "nextClick">
        <img src = "../../../assets/img/player/next.svg">
      </div>
      <div class = "control-item"><img src = "../../../assets/img/player/list.svg"></div>
    </div>
  </div>
</template>

<script>
  "use strict"
  export default {
    name: "PlayerAudio",
    props: {
      url: null
    },
    data() {
      return {
        audio: null,
        currentTime: 0,
        allTime: 0,
        playInterval: null,
        mode: 2,
        playing: 1
      }
    },
    computed: {
      isLoop() {
        return this.mode === 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.audio = this.$refs.audio;
        // this.$refs.audio.ended = this.nextClick();
        this.addLoop()
        this.play()
      })
    },
    methods: {
      addLoop() {
        if (this.isLoop) {
          this.$refs.audio.loop = "loop"
        } else {
          this.$refs.audio.loop = null
        }
      },
      timeBarClick(event) {
        // 点击进度条
        this.$refs.audio.currentTime = (event.x - event.view.innerWidth * 0.1) / (event.view.innerWidth * 0.8) * this.allTime
      },
      changeMode() {
        this.mode = (this.mode + 1) % 3
        this.addLoop()
      },
      pauseControl() {
        this.playing = (this.playing + 1) % 2;
        if (this.playing === 1) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      },
      nextClick() {
        this.$store.dispatch("next", { mode: this.mode })
      },
      lastClick() {
        this.$store.dispatch("last", { mode: this.mode })
      },
      play() {
        this.playInterval = setInterval(() => {
          this.allTime = isNaN(this.audio.duration) ? 0: this.audio.duration;
          this.currentTime = this.audio.currentTime;
          // console.log(this.currentTime);
          if (this.$refs.timeNow) {
            this.$refs.timeNow.style.right = 100 - (this.currentTime * 100 / this.allTime) + "%";
          }
        })
      }
    },
    filters: {
      musicTime(timer) {
        return (Math.floor(timer / 60)).toFixed(0) + ":" + "00".concat((timer % 60).toFixed(0)).slice(-2)
      }
    }
    ,
    watch: {}
  }
</script>

<style scoped>
  .audio-box {
    height: 25vh;
    width: 100vw;
    background-color: #464646;
  }

  .info-box {
    padding: 10px 0;
    display: flex;
  }

  .component {
    flex: 1;
    height: 30px;
    width: 30px;
  }

  .time-control {
    display: flex;
  }

  .current-time, .all-time {
    flex: 1;
    text-align: center;
    color: #fff;
  }

  .time-bar {
    position: relative;
    flex: 8;
    width: 80vw;
  }

  .time-now {
    position: absolute;
    display: inline-block;
    border-width: 0;
    top: 7px;
    left: 0;
    height: 3px;
    background-image: linear-gradient(to right, #fff, rgba(203, 120, 119, 0.75));
  }

  .time-last {
    position: absolute;
    display: inline-block;
    border-width: 0;
    top: 7px;
    width: 100%;
    height: 3px;
    color: #f2f2f2;
  }

  .music-control {
    display: flex;
  }

  .control-item {
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .control-item img {
    vertical-align: middle;
    height: 30px;
    width: 30px;
  }

  .control-item-big {
    flex: 2;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .control-item-big img {
    vertical-align: middle;
    height: 50px;
    width: 50px;
  }
</style>

