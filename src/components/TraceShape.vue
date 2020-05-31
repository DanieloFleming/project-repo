<template>
  <svg class="trace-shape">
    <rect v-bind="outerCircle" class="outer-ring__props">
      <template v-for="(value, key) in morphPath">
        <animate ref="animate"
                 begin="indefinite"
                 repeatCount="1"
                 fill="freeze"
                 :attributeName="key"
                 :dur="`${animationTime}ms`"
                 :to="value" />
      </template>
    </rect>
  </svg>
</template>

<script>
export default {
  name: 'TraceShape',
  props: {
    innerCircle: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      animationTime: 150,
      origin: { width: '30', height: '30', rx: '50%', x: '0', y: '0' }
      // morphPath: { width: '30', height: '30', rx: '50%', x: '0', y: '0' }
    };
  },
  computed: {
    tracePath () {
      return this.$store.getters.traceShape;
    },
    style () {
      return {
        position: 'absolute',
        opacity: this.opacity,
        transform: `translate3d(${this.innerCircle.x - 13}px, ${this.innerCircle.y - 13}px, 0)`
      };
    },
    outerCircle () {
      return { width: '30', height: '30', rx: '50%', x: this.innerCircle.x, y: this.innerCircle.y };
    },
    morphPath () {
      if (this.tracePath) {
        const { width, height, x, y } = this.tracePath;
        return { width, height, x, y, rx: 0 };
      }

      return this.outerCircle;
    }
  },
  watch: {
    tracePath () {
      if (this.tracePath) {
        this.origin = { ...this.outerCircle };
        return;
      }
      this.origin = { ...this.morphPath };
    },
    morphPath () {
      this.startAnimation();
    }
  },
  methods: {
    startAnimation () {
      this.$refs.animate.forEach(anime => {
        anime.beginElement();
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .trace-shape {
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .outer-ring__props {
    left: 50%;
    top: 50%;
    stroke: #eeeeee;
    stroke-width: 2px;
    overflow: hidden;
    fill: none;
  }
</style>
