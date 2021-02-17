<template>
  <form>
    <input type = "text" v-model = "text">
    <button @click.prevent = "commit">发送</button>
  </form>
</template>

<script>
  import { setcomment } from "../../../../../network/player";

  export default {
    name: "CommitComment",
    data() {
      return {
        id: this.$store.state.playingSong.id,
        text: ""
      }
    },
    methods: {
      commit() {
        setcomment({ id: this.id, content: this.text }).then(() => {
          this.$toast.show("发布评论成功!");
          this.text = ""
        }).catch(() => {
          this.$toast.show("发布评论太快啦，休息一下吧!")
        })
      }
    }
  }
</script>

<style scoped>
  form {
    position: absolute;
    display: block;
    bottom: 0;
    border-top: 1px solid #333333;
    height: 60px;
    width: 100vw;
  }

  input {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    width: 75%;
    height: 36px;
    margin: 5px 2.5%;
    border-radius: 18px;
  }

  input:focus, button:focus {
    outline: none;
  }

  button {
    position: relative;
    display: inline-block;
    height: 36px;
    width: 17%;
    margin: 5px 0;
    border-radius: 18px;
  }
</style>
