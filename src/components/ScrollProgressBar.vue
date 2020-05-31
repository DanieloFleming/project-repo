<template>
  <div class="scroll-progress">
    <span class="progress-bar bar-a" :style="progress"></span>
    <span class="progress-bar bar-b" :style="progress"></span>
  </div>
</template>
<script>
export default {
  name: 'ScrollProgressBar',
  computed: {
    windowHeight () {
      return this.$store.getters.windowHeight;
    },
    pageHeight () {
      return this.$store.getters.pageHeight;
    },
    scrollPosition () {
      return -this.$store.getters.scrollPosition;
    },
    progress () {
      const maxScroll = this.pageHeight - this.windowHeight;
      const scrollPosition = this.scrollPosition;
      const progress = scrollPosition / maxScroll * 100 - 100;

      return { transform: `translate3d(${progress}%, 0, 0)` };
    }
  }
};
</script>

<style lang="scss" scoped>
  .scroll-progress {
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 2px;
    background: none;
    overflow: hidden;
    transform: translateZ(0);
  }

  .progress-bar {
    position: absolute;
    width: 100%;
    height: 50%;
    transform: translateX(-100%);
  }

  .bar-a {
    top: 0;
    background: white;
  }

  .bar-b {
    bottom: 0;
    background: #808080;
  }
</style>
