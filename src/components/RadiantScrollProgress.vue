<template>
  <svg class="radiant-scroll-progress" :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size">
    <circle :r="radius" :cx="circleSize" :cy="circleSize" class="radiant-scroll__background" />
    <circle :r="radius" :cx="circleSize" :cy="circleSize" class="radiant-scroll__foreground" :style="progress" />
    <figure class="scroll-indicator" />
  </svg>
</template>

<script>
export default {
  name: 'RadiantScrollProgress',
  data () {
    return {
      size: 30
    };
  },
  computed: {
    circleSize () {
      return this.size / 2;
    },
    radius () {
      return this.circleSize - 3;
    },
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
      const percentage = scrollPosition / maxScroll;
      const fullCircle = 2 * Math.PI * this.radius;
      const dashOffset = fullCircle * (1 - percentage);
      return {
        strokeDashoffset: dashOffset,
        strokeDasharray: fullCircle
      };
    }
  }
};
</script>

<style scoped>
  .radiant-scroll-progress {
    position: absolute;
    overflow: hidden;
    bottom: .5rem;
    right: .5rem;
    opacity: .4;
  }
  .radiant-scroll__background {
    stroke-width: 4;
    stroke: #7b7b7b;
    fill: none;
  }
  .radiant-scroll__foreground {
    stroke-width: 4;
    stroke: white;
    fill: none;
    transform-origin: center;
    transform: rotateZ(-90deg)
  }
</style>
