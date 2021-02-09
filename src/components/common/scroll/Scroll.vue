<template>
  <div class = "wrapper" ref = "wrapper">
    <div class = "content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BS from "better-scroll"
  import ObserveImage from "@better-scroll/observe-image"

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      BS.use(ObserveImage)
      //第一个参数挂载对象，第二个参数设置监听事件参数
      this.scroll = new BS(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        observeImage: true,
        observeDOM: true //??
      })
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position)
      });
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
          setTimeout(() => {
            // console.log("加载更多");
            this.scroll.finishPullUp()
          }, 1000)
        })
      }
    },
    methods: {
      backTop(x = 0, y = 0, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      getPositionY() {
        return this.scroll.y
      },
      scrollTo(x = 0, y = 0, timer = 300) {
        this.scroll.scrollTo(x, y, timer)
      },
      refresh() {
        // console.log("判断成功");
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
</style>
