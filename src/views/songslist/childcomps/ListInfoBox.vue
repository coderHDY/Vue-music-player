<template>
  <div class = "information-box">
    <span class = "count"
          v-if = "information.info && information.info.count">播放量：{{information.info.count|count}}</span>
    <div class = "message-box" v-if = "information">
      <div class = "description">{{information.message}}</div>
      <div v-if = "information.info">
        <div class = "creator-info">
          <img :src = "information.info.authorImg" class = "creator-img">
          <div class = "author-name">{{information.info.author}}</div>
        </div>
        <span class = "author-copywriter">{{information.info.copywriter}}</span>
      </div>
      <div class = "list-name" ref = "listName">{{information.name || information.info && information.info.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListInfoBox",
    props: {
      information: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    methods: {
      imageLoad() {
        this.$emit("imageLoad")
      }
    },
    filters: {
      count(count) {
        return (count / 10000).toFixed(2) + "万"
      }
    }
  }
</script>

<style scoped>
  .information-box {
    position: relative;
  }

  .count {
    position: absolute;
    top: -28px;
    right: 0;
    padding: 3px 10px;
    background-color: rgba(255, 255, 255, 0.52);
  }

  .message-box {
    position: relative;
    padding: 10px 5px;
    background-color: #fff;
    font-size: var(--font-small);
    line-height: 20px;
    width: 100vw;
  }

  .description {
    position: relative;
    font-size: var(--font-small);
  }

  .creator-info {
    position: relative;
    height: 20vh;
    width: 100%;
    padding: 5px 0;
    overflow: hidden;
  }

  .creator-img {
    height: 80%;
    border-radius: 15%;
    vertical-align: middle;
  }

  .author-name {
    display: inline-block;
    font-size: var(--font-big);
    font-weight: bold;
    line-height: 50%;
    margin-left: 20px;
  }

  .author-copywriter {
    display: block;
    position: relative;
    font-size: var(--font-small);
    text-indent: calc(var(--font-small) * 2);
    margin-bottom: 20px;
  }

  .list-name {
    display: block;
    text-align: center;
    margin-top: 5px;
    padding: 3px 0;
    font-weight: bolder;
    font-size: var(--font-big);
    color: var(--color-red);
    background-color: #fff;
    text-shadow: 2px 2px 2px rgba(100, 100, 100, 0.6);
  }
</style>
