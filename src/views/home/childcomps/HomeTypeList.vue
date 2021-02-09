<template>
  <SongListView :list = "typeList" @itemClick = "itemClick"/>
</template>

<script>
  import SongListView from "../../../components/content/songlistview/SongListView";

  export default {
    name: "HomeTypeList",
    props: {
      //判断类型的index
      current_index: {
        type: Number,
        required: true
      },
      typeList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      SongListView
    },
    methods: {
      itemClick(index) {
        // 赋值正确的配置
        const option = {
          type: this.current_index === 0 ? "querySonger": "queryList",
          id: this.typeList[index].id,
          name: this.typeList[index].name
        };
        this.$emit("queryList", option)
      }
    }
  }
</script>

<style scoped>
</style>
