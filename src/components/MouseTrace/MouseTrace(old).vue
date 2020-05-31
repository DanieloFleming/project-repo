<template>
  <div
    v-if="coordinates && !touchable"
    class="mouse-trace">
    <svg :style="innerPosition" class="circle inner-circle">
      <circle class="inner-circle__props" cx="2" cy="2" r="1" />
    </svg>
    <svg :style="outerPosition" class="outer-ring">
      <circle class="outer-ring__props" cx="15" cy="15" r="14" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MouseTrace',
  data () {
    return {
      touchable: false,
      coordinates: null,
      drag: 0.6,
      mouse: {
        inner: { x: 0, y: 0 },
        outer: { x: 0, y: 0 }
      },
      innerPosition: null,
      outerPosition: null,
      isTracing: false
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
      outer.x += Math.trunc((x - 13 - outer.x) / this.drag);
      outer.y += Math.trunc((y - 13 - outer.y) / this.drag);

      this.mouse = { inner, outer };
    },
    setInnerPosition ({ x, y }) {
      this.innerPosition = {
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    },
    setOuterPosition ({ x, y }) {
      this.outerPosition = {
        transform: `translate3d(${x}px, ${y}px, 0)`,
        opacity: this.isTracing ? 0 : 1
      };
    },
    updatePositions () {
      if (this.coordinates) {
        this.setPosition(this.coordinates);
        this.setInnerPosition(this.mouse.inner);
        this.setOuterPosition(this.mouse.outer);
      }
      requestAnimationFrame(this.updatePositions);
    },
    setTraceOpacity (tracing) {
      this.isTracing = tracing;
    }
  }
};
</script>
<style>
  #app {
    cursor: none;
  }
</style>
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
    pointer-events: none;
  }
  .inner-circle {
    width: 4px;
    height: 4px;
  }
  .inner-circle__props {
    stroke: #fff;
    stroke-width: 1px;
    fill: #fff;
    overflow: hidden;
  }

  .outer-ring {
    width: 30px;
    height: 30px;
    transition: transform .3s ease-out;
  }
  .outer-ring__props {
    stroke: #eeeeee;
    stroke-width: 2px;
    overflow: hidden;
    fill: none;
  }
</style>
