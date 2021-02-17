<template>
  <div class = "audio-box">
    <!--    <div class = "info-box">-->
    <!--      <img src = "../../../assets/img/player/like_white.svg" class = "component"/>-->
    <!--      <img src = "../../../assets/img/player/comment_white.svg" class = "component"/>-->
    <!--      <img src = "../../../assets/img/player/download.svg" class = "component"/>-->
    <!--    </div>-->
    <div class = "time-control">
      <div class = "current-time">{{ musicTime(currentTime )}}</div>
      <div class = "time-bar" ref = "timeBar" @click = "timeBarClick">
        <hr class = "time-now" style = "right: 100%" ref = "timeNow"/>
        <hr class = "time-last"/>
      </div>
      <div class = "all-time">{{ musicTime(allTime)}}</div>
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
      <div class = "control-item" @click = "goComment"><img src = "../../../assets/img/player/comment_white.svg"></div>
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
        playInterval: null, //清除上一首的监控
        mode: 2,
        playing: 1,
        nextSong: false  //判断自动下一首，防抖
      }
    },
    computed: {
      isLoop() {
        return this.mode === 0
      },
      musicTime() {
        return timer => {
          return (Math.floor(timer / 59)).toFixed(0) + ":" + "00".concat((timer % 59).toFixed(0)).slice(-2)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.audio = this.$refs.audio;
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
        this.playing = 1
        if (this.playInterval) clearInterval(this.playInterval)
        this.playInterval = setInterval(() => {
          this.allTime = isNaN(this.audio.duration) ? 0: this.audio.duration.toFixed(0);
          this.currentTime = this.audio.currentTime.toFixed(0);
          // 可能时间条还没挂在好，需要判断
          if (this.$refs.timeNow) {
            this.$refs.timeNow.style.right = 100 - (this.currentTime * 100 / this.allTime) + "%";
          }
          //这首放完自动下一首(增加了网络防抖)（判断非loop模式）
          if (this.allTime === this.currentTime && !this.isLoop && !this.nextSong) {
            this.nextSong = !this.nextSong
            this.currentTime = 0
            this.nextClick()
            setTimeout(() => {
              this.nextSong = !this.nextSong
            }, 1000)
          }
        })
      },
      goComment() {
        this.$emit("goComment")
      }
    }
  }
</script>

<style scoped>
  .audio-box {
    height: 15vh;
    width: 100vw;
    /*background-color: #464646;*/
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
    display: inline-block;
    flex: 8;
    width: 80vw;
    margin: 0;
  }

  .time-now {
    position: absolute;
    display: block;
    border-width: 0;
    top: 8px;
    margin: 0;
    left: 0;
    height: 3px;
    background-image: linear-gradient(to right, #fff, rgba(203, 120, 119, 0.75));
  }

  /*宽度百分百，播放的自动覆盖*/
  .time-last {
    position: absolute;
    display: block;
    border-width: 0;
    top: 9px;
    margin: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(238, 238, 238, 0.18);
    color: #f2f2f2;
  }

  .music-control {
    margin-top: 10px;
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
    height: 25px;
    width: 25px;
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

