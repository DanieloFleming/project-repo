<template>
  <div :class="page" @scroll="lockToScroll($event)">
    <div ref="scroll" class="scroll-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: 'TouchScrollPage',
  data () {
    return {
      posY: 0
    };
  },
  computed: {
    scrollable () { return this.$store.getters.scrollable; },
    page () {
      return this.scrollable ? 'page' : 'page no-scroll';
    }
  },
  watch: {
    posY: {
      immediate: true,
      handler (position) {
        this.$store.commit('setScrollPosition', position);
      }
    }
  },
  methods: {
    lockToScroll (e) {
      this.posY = e.currentTarget.scrollTop * -1;
    }
  }
};
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: absolute;
  }
  .page.no-scroll {
    overflow: hidden;
  }

</style>
