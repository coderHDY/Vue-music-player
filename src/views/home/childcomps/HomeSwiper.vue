<template>
  <div class = "swiper-container">
    <div class = "swiper-wrapper">
      <div class = "swiper-slide" v-for = "item in banners">
        <a :href = "item.url">
          <img :src = "item.pic" @load = "imageLoad">
        </a>
      </div>

    </div>
    <!-- 如果需要分页器 -->
    <div class = "swiper-pagination"></div>

  </div>
  <!--  导航等组件可以放在container之外-->
</template>

<script>
  import Swiper from "swiper"

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isEmit:false,
        //swipe 的切换效果随机
        effect: [ "flip", "slide", "fade", "cube", "coverflow" ],
        //swipe 的参数
        swiperOptions: {
          autoplay: {
            disableOnInteraction: false,
            delay: 2500
          },
          speed: 700,
          loop: true,
          click: true,
          effect: "flip",
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        },
        swiper: null
      }
    },
    mounted() {
      this.changeSlid()
      this.initSwiper()
    },
    methods: {
      //随机特效
      changeSlid(){
        const index = Math.floor(Math.random() * 10 / 2);
        this.swiperOptions.effect = this.effect[index]
      },
      // 初始化swiper
      initSwiper() {
        let mySwiper = new Swiper('.swiper-container', this.swiperOptions)
        this.swiper = mySwiper
      },
      // 图片加载后重新初始化swiper，让loop生效
      imageLoad() {
        if (this.swiper) this.swiper.destroy();
        this.initSwiper()
        if(!this.isEmit){
          this.$emit("imageLoad")
          this.isEmit=true
        }
        //
      }
    }
  }
</script>

<style scoped>
  .swiper-container {
    position: relative;
    width: 100vw;
    height: calc(100vw / 2.6);
    overflow: hidden;
  }

  .swiper-container img {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translate(-50%);
  }
</style>
