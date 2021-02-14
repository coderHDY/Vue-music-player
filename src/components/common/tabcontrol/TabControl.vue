<template>
  <div class = "teb-control">
    <div v-for = "(item,index) in items" class = "tab-control-item" @click = "itemClick(index)"
         :class = "{active:index===current_index}">
      <span>
      {{item}}
      </span>
    </div>
  </div>
</template>

<script>
  //流式的封装组件，点谁谁变色，传入数组,需改动颜色
  export default {
    name: "TabControl",
    props: {
      items: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        current_index: 0
      }
    },
    methods: {
      itemClick(index) {
        if (this.current_index !== index) {
          this.current_index = index;
          this.$emit("tabClick", this.current_index)
        }
      }
    }
  }
</script>

<style scoped>
  .teb-control {
    display: flex;
    background-color: #fff;
    text-align: center;
    z-index: 6;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding-bottom: 3px;
  }

  .active span {
    color: var(--color-red);
    border-bottom: 3px solid var(--color-red);
    /*box-shadow: 0 2px 3px rgba(216, 30, 6, 0.7);*/
  }
</style>
