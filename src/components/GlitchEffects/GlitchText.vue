<template>
  <div class="glitch-wrapper" :style="attributes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GlitchText',
  props: {
    text: {
      type: String,
      default: 'Haunted'
    },
    duration: {
      type: Number,
      default: 4
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isScrolling () {
      return this.$store.getters.scrolling;
    },
    playState () {
      return this.isScrolling ? 'none' : null;
    },
    attributes () {
      return {
        animationDuration: `${this.duration}s`,
        animationDelay: `${this.delay}s`,
        animationName: this.playState
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .glitch-wrapper {
    animation-name: glitch-anim-text;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .glitch-wrapper {
    display: block;
    overflow: hidden;
  }

  @keyframes glitch-anim-text {
    0% {
      transform: translate3d(calc(-1 * 10px),0,0) scale3d(-1,-1,1);
      clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    }
    2% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }
    4% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }
    5% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }
    6% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }
    7% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }
    8% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }
    9% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }
    9.9% {
      transform: translate3d(calc(-1 * 10px),0,0) scale3d(-1,-1,1);
    }
    10%, 100% {
      transform: translate3d(0,0,0) scale3d(1,1,1);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
</style>
