<template>
  <transition name = "fade">
    <div class = "toast" v-if = "isShow">
      {{message}}
    </div>
  </transition>
</template>

<script>
  export default {
    name: "MyToast",
    data() {
      return {
        message: '',
        isShow: false,
        bound: null,
      }
    },
    methods: {
      show(message = "默认信息", timer = 1500) {
        if (this.bound) clearTimeout(this.bound)
        // console.log("show被调用了");
        this.message = message;
        this.isShow = true;
        this.bound = setTimeout(() => {
          this.isShow = false;
          this.message = ""
        }, timer)
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0.3;
  }

  .toast {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 12px;
    opacity: .8;
    backdrop-filter: none;
    transform: translate(-50%, -50%);
    background-color: #949494;
    border-radius: 5px;
    color: #fff;
    z-index: 999;
  }
</style>
