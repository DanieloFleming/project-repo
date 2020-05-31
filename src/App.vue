<template>
  <div id="app">
    <transition
      name="fade"
      mode="in-out">
      <router-view />
    </transition>
    <mouse-trace />
  </div>
</template>
<script>
import MouseTrace from '@/components/MouseTrace';

export default {
  components: { MouseTrace },
  beforeMount () {
    window.addEventListener('touchstart', this.setMobileMode.bind(this));
    window.addEventListener('resize', this.setWindowSize.bind(this));
    this.setWindowSize();
  },
  beforeDestroy () {
    window.removeEventListener('touchstart', this.setMobileMode);
    window.removeEventListener('resize', this.setWindowSize);
  },
  methods: {
    setMobileMode () {
      window.removeEventListener('touchstart', this.setMobileMode.bind(this));
      this.$store.commit('setMobile', true);
    },
    setWindowSize () {
      const windowHeight = window.innerHeight;
      this.$store.commit('setWindowHeight', windowHeight);
    }
  }
};
</script>
<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    user-select: none;
    text-rendering: optimizeSpeed;
  }
  *{
    margin: 0;
    padding: 0;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
    display: none;
  }

  .fade-leave-active {
    position: absolute !important;
    top: 0;
    width: 100%;
    transition-duration: 1s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
</style>
<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
