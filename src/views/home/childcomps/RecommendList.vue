<template>
  <div class="recommend-box">
    <div class="recommend-title">
      推荐歌单
    </div>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="recommend-list scroll-content">
        <div
          class="recommend-item"
          v-for="item in songLists"
          @click="queryList(item.name, item.id)"
        >
          <img :src="item.img" class="item-img" @load="imageLoad" />
          <div class="item-name">{{ item.name }}</div>
          <div class="item-count">{{ item.count | count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initHomeSongList } from "../../../network/types";
import BScroll from "better-scroll";
import ObserveImage from "@better-scroll/observe-image";

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
    };
  },
  computed: {
    songLists() {
      return initHomeSongList(this.recommendSongList) || [];
    }
  },
  methods: {
    imageLoad() {
      if (!this.isEmit) {
        this.$emit("imageLoad");
        this.isEmit = true;
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
    },
    queryList(name, id) {
      const option = {
        type: "queryList",
        name: name,
        id: id
      };
      this.$emit("queryList", option);
    }
  },
  mounted() {
    this.initBS();
  },
  filters: {
    count(count) {
      let ans = count / 10000;
      return ans > 10000
        ? Math.floor(ans / 10000) + "亿"
        : Math.floor(ans) + "万";
    }
  }
};
</script>

<style scoped>
.recommend-box {
  position: relative;
  background-color: #fff;
  margin-top: 0.3rem;
  margin-bottom: 10px;
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
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
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
  padding: 0.1rem 0.1rem;
  text-align: center;
  vertical-align: top;
}

.recommend-item img {
  position: relative;
  top: 0;
  width: 80%;
  border-radius: 0.5rem;
  vertical-align: top;
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
  right: 11%;
  top: 4px;
  padding: 1px 3px;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: rgba(181, 181, 181, 0.7);
}
</style>
