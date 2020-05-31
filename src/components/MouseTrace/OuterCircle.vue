<template>
  <svg :style="targetPosition" class="outer-ring" :viewBox="viewBox">
    <rect class="outer-ring__props" v-bind="rect">
      <animate
        v-for="(value, key, id) in morphTo"
        :key="id"
        ref="target"
        begin="indefinite"
        fill="freeze"
        :attributeName="key"
        :dur="`100ms`"
        :to="value" />

      <animate
        v-for="(value, key, id) in rect"
        :key="id + 10"
        ref="origin"
        begin="indefinite"
        fill="freeze"
        :attributeName="key"
        :dur="`100ms`"
        :to="value" />
    </rect>
  </svg>
</template>

<script>
import { waitFor } from '@/utils';

const baseShape = { width: 30, height: 30, x: 0, y: 0, rx: '50%' };
export default {
  name: 'OuterCircle',
  props: {
    position: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      morphed: false,
      origin: baseShape,
      rect: baseShape,
      anchorPosition: { x: 0, y: 0 },
      parent: null,
      morphTo: baseShape
    };
  },
  computed: {
    tracePath () {
      return this.$store.getters.traceShape;
    },
    viewBox () {
      if (!this.parent) {
        return '-1 -1 32 32';
      }
      return `-1 -1 ${this.parent.width + 2} ${this.parent.height + 2}`;
    },
    targetPosition () {
      if (!this.parent) {
        return {
          transform: `translate3d(${this.position.x}px, ${this.position.y}px, 0)`
        };
      }
      const { width, height, transition, x, y } = this.parent;
      return {
        width: `${width}px`,
        height: `${height}px`,
        transition,
        transform: `translate3d(${x}px, ${y}px, 0)`
      };
    }
  },
  watch: {
    async tracePath () {
      if (this.timeOut) return;

      if (!this.active && this.tracePath && !this.morphed) {
        await this.morphing;
        return this.setMorphState();
      }
      this.timeOut = setTimeout(async () => {
        await this.morphing;
        this.setMorphState();
      }, 320);
    }
  },
  methods: {
    setMorphState () {
      this.timeOut = null;
      if (this.tracePath && !this.morphed) {
        this.morphing = new Promise(this.expand);
      } else if (this.tracePath && this.morphed) {
        this.morphing = new Promise(this.reMorph);
      } else {
        this.morphing = new Promise(this.collapse);
      }
    },
    async expand (resolve) {
      this.active = true;
      this.setContainer(resolve);
      await waitFor(20);
      this.setPosition();
      await waitFor(150);
      this.animate('target');
      await waitFor(100);
      this.morphed = true;
      this.active = false;
      resolve();
    },
    async reMorph (resolve) {
      this.active = true;
      this.animate('origin');
      await waitFor(100);
      this.resetContainer(resolve);
      await waitFor(20);
      this.setPosition();
      await waitFor(150);
      this.animate('target');
      await waitFor(100);
      this.active = false;
      resolve();
    },
    async collapse (resolve) {
      this.active = true;
      this.animate('origin');
      await waitFor(100);
      this.setContainer(resolve);
      this.morphed = false;
      // await waitFor(100);
      this.active = false;
      resolve();
    },
    resetContainer (resolve) {
      if (!this.tracePath || !this.parent) {
        this.rect = this.origin;
        this.morphTo = this.origin;
        this.parent = null;
        return resolve();
      }
      const { tracePath: { width, height }, parent } = this;

      const posX = (width / 2) - 15;
      const posY = (height / 2) - 15;
      const rectX = parent.x + (parent.width / 2) - 15;
      const rectY = parent.y + (parent.height / 2) - 15;
      const uX = rectX - posX;
      const uY = rectY - posY;

      this.rect = { ...this.origin, x: posX, y: posY };
      this.morphTo = this.origin;
      this.parent = { x: uX, y: uY, width, height };
    },
    setContainer (resolve) {
      if (this.tracePath) {
        const { tracePath: { width, height }, position } = this;
        const posX = (width / 2) - 15;
        const posY = (height / 2) - 15;
        const uX = position.x - posX;
        const uY = position.y - posY;

        this.rect = { ...this.rect, x: this.rect.x + posX, y: this.rect.y + posY };
        this.parent = { x: uX, y: uY, width, height };
      } else {
        this.rect = this.origin;
        this.morphTo = this.origin;
        this.parent = null;
        resolve();
      }
    },
    setPosition () {
      if (this.tracePath) {
        const { x, y, width, height } = this.tracePath;
        this.parent = { width, height, x, y, transition: 'transform .15s ease' };
        this.morphTo = { x: 0, y: 0, width, height, rx: 0 };
      }
    },
    animate (type) {
      this.$refs[type].forEach(anime => { anime.beginElement(); });
    }
  }
};
</script>

<style scoped lang="scss">
  .outer-ring {
    width: 30px;
    height: 30px;
    position: absolute;
    overflow: hidden;
    will-change: width, height;
    // background: orange
  }
  .outer-ring__props {
    stroke: #eeeeee;
    stroke-width: 3px;
    fill: none;
    // fill: pink;
  }
</style>
