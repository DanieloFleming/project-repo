<template>
  <div class="glitch-image">
    <div
      v-for="index in 5"
      :key="index"
      class="glitch__content"
      :class="`content-${index}`"
      :style="backgroundImage">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlitchImage',
  props: {
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    isScrolling () {
      return this.$store.getters.scrolling;
    },
    playState () {
      return this.isScrolling ? 'none' : null;
    },
    backgroundImage () {
      return {
        backgroundImage: `url(${this.image})`,
        animationName: this.playState
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .glitch-image {
    position: relative;
    overflow: hidden;
  }
  .glitch__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    transform: translate3d(0,0,0);
    background-blend-mode: none;
  }
  .glitch__content:nth-child(n+2) {
    opacity: 0;
    animation-duration: 4s;
    animation-delay: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .glitch__content:nth-child(2) {
    background-color: transparent;
    background-blend-mode: none;
    animation-name: glitch-anim-1;
  }

  .glitch__content:nth-child(3) {
    background-color: transparent;
    background-blend-mode: none;
    animation-name: glitch-anim-2;
  }

  .glitch__content:nth-child(4) {
    background-color: transparent;
    background-blend-mode: none;
    animation-name: glitch-anim-3;
  }

  .glitch__content:nth-child(5) {
    background-color: #2f2f2f;
    background-blend-mode: overlay;
    animation-name: glitch-anim-flash;
  }
  @keyframes glitch-anim-1 {
    0% {
      opacity: 1;
      transform: translate3d(10px,0,0);
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    }
    2% {
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }
    4% {
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }
    6% {
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }
    8% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }
    10% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }
    12% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }
    14% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }
    16% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }
    18% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }
    20% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }
    21.9% {
      opacity: 1;
      transform: translate3d(10px,0,0);
    }
    22%, 100% {
      opacity: 0;
      transform: translate3d(0,0,0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }

  @keyframes glitch-anim-2 {
    0% {
      opacity: 1;
      transform: translate3d(calc(-1 * 10px),0,0);
      clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
    }
    3% {
      clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    }
    5% {
      clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    }
    7% {
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }
    9% {
      clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    }
    11% {
      clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    }
    13% {
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }
    15% {
      clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    }
    17% {
      clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    }
    19% {
      clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    }
    20% {
      clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
    }
    21.9% {
      opacity: 1;
      transform: translate3d(calc(-1 * 10px),0,0);
    }
    22%, 100% {
      opacity: 0;
      transform: translate3d(0,0,0);
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }
  /* Flash */
  @keyframes glitch-anim-flash {
    0%, 5% {
      opacity: 0.2;
      transform: translate3d(10px, 5px, 0);
    }
    5.5%, 100% {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
  }

</style>
