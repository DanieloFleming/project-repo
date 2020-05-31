<template>
  <div class="page" @[wheelEvent]="setDeltaY">
    <div ref="container" class="scroll-container" :style="containerScrollPosition">
      <slot></slot>
    </div>
    <radiant-scroll-progress />
  </div>
</template>
<script>
import ScrollProgressBar from '../ScrollProgressBar';
import RadiantScrollProgress from '../RadiantScrollProgress';
const ZERO = 0;

export default {
  name: 'WheelScrollPage',
  components: { RadiantScrollProgress, ScrollProgressBar },
  data () {
    return {
      posY: 0,
      deltaY: 0,
      velocity: 0,
      friction: 0.9,
      speedModifier: 0.1,
      onGoingScroll: 0,
      scrollStart: false,
      scrollContainer: null,
      containerScrollPosition: null
    };
  },
  computed: {
    scrollable () { return this.$store.getters.scrollable; },
    pageHeight () { return this.$store.getters.pageHeight; },
    wheelEvent () { return this.scrollable ? 'wheel' : null; }
  },
  watch: {
    posY: {
      immediate: true,
      handler (position) {
        this.$store.commit('setScrollPosition', position);
      }
    },
    pageHeight () {
      this.setScrollLimit();
    }
  },
  mounted () {
    this.setScrollLimit();
    requestAnimationFrame(this.updatePositions);
  },
  beforeDestroy () {
    cancelAnimationFrame(this.updatePositions);
  },
  methods: {
    setDeltaY ({ deltaY }) {
      this.deltaY = deltaY;
      this.timestamp = null;

      this.onGoingScroll++;
      this.$store.commit('setScrolling', true);
    },
    setPosY (scrolled) {
      const newPosY = this.posY + this.velocity;
      const clampY = Math.min(ZERO, newPosY);

      this.velocity -= scrolled * this.speedModifier;
      this.velocity *= this.friction;

      this.posY = Math.max(clampY, this.maxScrollHeight);
    },
    setScrollLimit () {
      const windowHeight = window.innerHeight;
      const pageHeight = this.$refs.container.offsetHeight;

      this.maxScrollHeight = Math.min(ZERO, windowHeight - pageHeight);
    },
    setContainerPosition (posY) {
      this.containerScrollPosition = {
        transform: `translate3d(0, ${posY}px, 0)`
      };
    },
    checkScrollState (timestamp) {
      if (!this.onGoingScroll) return;

      if (!this.timestamp) {
        return this.setCycleCount(timestamp);
      }

      if (timestamp - this.timestamp >= 50 && this.clockCycle === this.onGoingScroll) {
        this.onScrollEnd();
      }
    },
    setCycleCount (timestamp) {
      this.clockCycle = this.onGoingScroll;
      this.timestamp = timestamp;
    },
    onScrollEnd () {
      this.deltaY = this.onGoingScroll = 0;
      this.clockCycle = this.timestamp = null;
      this.$store.commit('setScrolling', false);
    },
    updatePositions (timestamp) {
      if (this.deltaY !== null || this.scrollable) {
        this.checkScrollState(timestamp);
        this.setPosY(this.deltaY);
        this.setContainerPosition(this.posY);
      }
      requestAnimationFrame(this.updatePositions);
    }
  }
};
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    scrollbar-width: none;
  }

  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
</style>
