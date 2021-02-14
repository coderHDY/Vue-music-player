<template>
  <div class = "swiper-container">
    <div class = "swiper-wrapper">
      <div class = "swiper-slide">
        <slot name = "one"></slot>
      </div>
      <div class = "swiper-slide">
        <slot name = "two"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from "../scroll/Scroll";
  import Swiper from "swiper";

  export default {
    name: "SwiperScroll",
    components: {
      Scroll
    },
    data() {
      return {
        mySwiper: null
      }
    },
    methods: {
      swiperChange(index) {
        this.mySwiper.slideTo(index, 500, false);//切换到第一个slide，速度为1秒
      }
    },
    mounted() {
      const that = this;
      this.mySwiper = new Swiper('.swiper-container', {
        on: {
          slideChangeTransitionEnd: function () {
            that.$emit("tabClick", this.activeIndex)
          },
        },
      })
    }
  }
</script>

<style scoped>
  .swiper-slide {
    /*position: relative;*/
    height: 100vh;
  }
</style>
