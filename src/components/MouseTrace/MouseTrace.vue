<template>
  <div
    v-if="coordinates && !touchable"
    class="mouse-trace">
    <outer-circle :position="outerPosition" />
    <svg :style="innerPosition" class="circle inner-circle">
      <circle class="inner-circle__props" cx="4" cy="4" r="2" />
    </svg>
  </div>
</template>

<script>
import OuterCircle from './OuterCircle';
export default {
  name: 'MouseTrace',
  components: { OuterCircle },
  data () {
    return {
      touchable: false,
      coordinates: null,
      drag: 10,
      mouse: {
        inner: { x: 0, y: 0 },
        outer: { x: 0, y: 0 }
      },
      innerPosition: { x: 0, y: 0 },
      outerPosition: { x: 0, y: 0 }
    };
  },
  mounted () {
    document.addEventListener('mousemove', this.setCoordinates);
    document.addEventListener('touchstart', this.preventClick);

    requestAnimationFrame(this.updatePositions);
  },
  beforeDestroy () {
    document.removeEventListener('mousemove', this.setCoordinates);
    document.addEventListener('touchstart', this.preventClick);

    cancelAnimationFrame(this.updatePositions);
  },
  methods: {
    preventClick (e) {
      this.touchable = true;
      cancelAnimationFrame(this.updatePositions);
    },
    setCoordinates ({ clientX, clientY }) {
      this.coordinates = { x: clientX, y: clientY };
    },
    setPosition ({ x, y }) {
      const inner = { x, y };
      const outer = { ...this.mouse.outer };
      const dx = x - 13 - outer.x;
      const dy = y - 13 - outer.y;
      outer.x += Math.trunc(dx / this.drag);
      outer.y += Math.trunc(dy / this.drag);

      this.mouse = { inner, outer };
    },
    setInnerPosition ({ x, y }) {
      this.innerPosition = {
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    },
    setOuterPosition (position) {
      this.outerPosition = position;
    },
    updatePositions () {
      if (this.coordinates) {
        this.setPosition(this.coordinates);
        this.setInnerPosition(this.mouse.inner);
        this.setOuterPosition(this.mouse.outer);
      }
      requestAnimationFrame(this.updatePositions);
    }
  }
};
</script>
<style lang="scss" scoped>
  .mouse-trace {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  .circle {
    position: absolute;
  }
  .inner-circle {
    width: 8px;
    height: 8px;
  }
  .inner-circle__props {
    stroke: #fff;
    stroke-width: 1px;
    fill: #fff;
    overflow: hidden;
  }
</style>
<style lang="scss">
  #app {
    cursor: none;
  }
</style>
