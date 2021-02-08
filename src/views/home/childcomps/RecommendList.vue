<template>
  <div class = "recommend-box">
    <div class = "recommend-title">
      推荐歌单
    </div>
    <div class = "scroll-wrapper" ref = "scrollWrapper">
      <div class = "recommend-list scroll-content">
        <div class = "recommend-item" v-for = "item in songLists">
          <img :src = "item.img" class = "item-img" @load = "imageLoad">
          <div class = "item-name">{{item.name}}</div>
          <div class = "item-count">{{item.count | count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initHomeSongList } from "../../../network/types";
  import BScroll from "better-scroll"
  import ObserveImage from "@better-scroll/observe-image"

  export default {
    name: "RecommendList",
    props: {
      recommendSongList: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        Bscroll: null,
        refresh: null,
        isEmit: false
      }
    },
    computed: {
      songLists() {
        return initHomeSongList(this.recommendSongList) || []
      }
    },
    methods: {
      imageLoad() {
        if (!this.isEmit) {
          this.$emit("imageLoad");
          this.isEmit = true
        }
      },
      initBS() {
        BScroll.use(ObserveImage);
        const bs = new BScroll(this.$refs.scrollWrapper, {
          scrollX: true,
          scrollY: false,
          click: true,
          probeType: 1,
          observeImage: true
        });
        this.Bscroll = bs;
      }
    },
    mounted() {
      this.initBS()
    },
    filters: {
      count(count) {
        return (count / 10000).toFixed(0) + "万"
      }
    }
  }
</script>

<style scoped>
  .recommend-box {
    background-color: #fff;
    margin-top: .3rem;
    margin-bottom: 3px;
  }

  .recommend-title {
    height: 2rem;
    line-height: 2rem;
    font-size: var(--font-big);
    padding-left: 1rem;
    font-weight: bolder;
  }

  .recommend-list {
    position: relative;
    height: 26vh;
    padding-top: .1rem;
    padding-bottom: .1rem;
    white-space: nowrap;
  }

  .scroll-content {
    display: inline-block;
    padding-left: 10px;
  }

  .recommend-item {
    position: relative;
    display: inline-block;
    width: 23vh;
    height: 100%;
    padding: .1rem .1rem;
    text-align: center;
  }

  .recommend-item img {
    width: 80%;
    border-radius: .5rem;
    vertical-align: middle;
  }

  .item-name {
    position: relative;
    display: block;
    margin: 3px 7%;
    height: 3.5rem;
    font-size: var(--font-small);
    line-height: 16px;
    text-align: left;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
  }

  .item-count {
    position: absolute;
    right: 3.5vh;
    top: 4px;
    padding: 1px 3px;
    border-radius: .3rem;
    font-size: .3rem;
    color: #fff;
    background-color: rgba(181, 181, 181, 0.7);
  }
</style>
