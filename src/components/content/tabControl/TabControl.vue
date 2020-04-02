<template>
  <div class="tab-control">
    <div class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return ['流行', '新款', '精选'];
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index 
      this.$emit('tabClick', index)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding:5px;
}
.active {
  color: var(--color-high-text);
}
.tab-control-item.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>
