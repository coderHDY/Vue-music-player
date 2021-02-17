<template>
  <transition name = "fade">
    <div class = "comment" v-if = "isShow">
      <CommentNavBar @commentHidden = "hidden" :total = "total"/>
      <Scroll ref = "scroll" class = "scroll" :pullUpLoad = "true"
              @pullingUp = "pullingUp">
        <h3 v-if = "hotComments.length>0">热评</h3>
        <CommentList :list = "hotComments"/>
        <h3 v-if = "comments.length>0">最新评论</h3>
        <CommentList :list = "comments"/>
      </Scroll>
      <CommitComment/>
    </div>
  </transition>
</template>

<script>
  // 内部引用
  import CommentNavBar from "./childrencomps/CommentNavBar";
  import CommentList from "./childrencomps/CommentList";
  import CommitComment from "./childrencomps/CommitComment";
  // 外部引用
  import Scroll from "../../../../components/common/scroll/Scroll";
  import { debounce } from "../../../../components/common/utils/utils";
  // 网络引用
  import { getcomment } from "../../../../network/player";
  import { initComment } from "../../../../network/types";

  export default {
    name: "Comment",
    data() {
      return {
        isShow: false,
        comments: [],
        hotComments: [],
        total: 0,
        offset: 0,
        limit: 100,
        debounce: null
      }
    },
    components: {
      CommentNavBar,
      Scroll,
      CommentList,
      CommitComment
    },
    methods: {
      show() {
        this.isShow = true;
        this.getComments()
      },
      hidden() {
        this.isShow = false;
        this.comments = [];
        this.hotComments = []
        this.offset = 0
      },
      getComments(offset = this.offset, limit = this.limit) {
        getcomment(this.$store.state.playingSong.id, limit, offset).then(res => {
          this.total = res.data.total;
          this.offset += this.limit
          this.comments.push(...(initComment(res.data.comments)))
          // 第一次过后就没有热评了
          if (res.data.hotComments) {
            this.hotComments.push(...(initComment(res.data.hotComments)))
          }
        })
      },
      pullingUp() {
        this.debounce = debounce(this.getComments, 500);
        this.debounce()
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s !important;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0 !important;
  }

  .comment {
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 11;
  }

  .scroll {
    position: relative;
    top: 44px;
    height: calc(100vh - 104px);
    overflow: hidden;
  }

  h3 {
    border-bottom: 1px solid #7f7f7f;
    padding: 20px 5px;
    color: #f00008;
    text-align: center;
  }

</style>
