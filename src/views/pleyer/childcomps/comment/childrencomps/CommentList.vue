<template>
  <div>
    <div v-for = "(item,index) in list" :key = "index" class = "comment-box">
      <div class = "user-img-box">
        <img :src = "item.userImg" class = "user-img">
      </div>

      <div class = "flex-right">
        <div class = "comment-info">
          <div class = "user-name">{{item.userName}}</div>
          <div class = "liked-box" @click = "likeComment(item)">
            <span class = "like-num" :class = "{'is-like':item.isLike}">{{item.likeNum}}</span>
            <img src = "../../../../../assets/img/player/iconfont-dianzan_red.svg" v-if = "item.isLike">
            <img src = "../../../../../assets/img/player/iconfont-dianzan_white.svg" v-else>
          </div>
          <div class = "comment-date">{{item.commentDate | commentDate}}</div>
        </div>
        <div class = "content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from "../../../../../components/common/utils/utils";
  import { goodComment } from "../../../../../network/player";

  export default {
    name: "CommentList",
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      likeComment(item) {
        const id = this.$store.state.playingSong.id
        const cid = item.id
        const t = item.isLike ? 0: 1
        goodComment({ id, cid, t }).then(res => {
          if (res.data.code === 200) {
            if (item.isLike) {
              item.likeNum -= 1
            } else {
              item.likeNum += 1
            }
            item.isLike = !item.isLike
          }
        })
      }
    },
    filters: {
      commentDate(date) {
        return formatDate(date, "yyyy年MM月dd日")
      }
    }
  }
</script>

<style scoped>
  .comment-box {
    position: relative;
    display: block;
    margin-bottom: 3px;
    padding-bottom: 3px;
    border-bottom: 1px solid #bd97a4;
  }

  .user-img-box {
    width: 60px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    line-height: 60px;
    vertical-align: top;
  }

  .user-img {
    position: relative;
    height: 46px;
    width: 46px;
    margin: 5px 10px;
    border-radius: 50%;
  }

  .flex-right {
    position: relative;
    display: inline-block;
    width: calc(100vw - 70px);
  }

  .comment-info {
    position: relative;
    height: 50px;
    margin: 5px 3px;
    line-height: 30px;
    overflow: hidden;
  }

  .user-name {
    position: relative;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
  }

  .comment-date {
    display: block;
    position: absolute;
    left: 2px;
    bottom: 2px;
    color: var(--color-text-dust);
    font-size: var(--font-small);
  }

  .liked-box {
    display: inline-block;
    position: absolute;
    line-height: 20px;
    right: 5px;
    top: 3px;
    font-size: var(--font-small);
    color: var(--color-text-dust);
  }

  .liked-box img {
    height: 25px;
    vertical-align: bottom;
  }

  .is-like {
    color: var(--color-red);
  }

  .like-num {
    display: inline-block;
    vertical-align: middle;
  }

  .content {
  }
</style>
