<template>
  <div class = "tab-bar-item" @click = "itemClick">
    <div v-if = "!isActive">
      <slot name = "item-icon"></slot>
    </div>
    <div v-else>
      <slot name = "item-icon-active"></slot>
    </div>
    <div :style = "activeClass">
      <slot name = "item-name"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: String,
      activeColor: {
        type: String,
        default: "var(--color-red)"
      }
    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) >= 0
      },
      activeClass() {
        return this.isActive ? { color: this.activeColor }: {}
      }
    },
    methods: {
      itemClick() {
        if (this.$router.currentRoute.path.indexOf(this.link) === -1) {
          this.$router.replace(this.link);
        }
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: var(--font-small);
    color: var(--color-text-dust)
  }

  .tab-bar-item.tab-bar-item img {
    height: 28px;
    width: 28px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>
