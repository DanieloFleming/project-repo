<template>
  <div class="magnet"
       @mouseenter="setTraceShape"
       @mouseleave="unsetTraceShape">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Magnet',
  methods: {
    setTraceShape () {
      this.$store.commit('setTraceShape', this.$el.getBoundingClientRect());
    },
    unsetTraceShape () {
      this.$store.commit('setTraceShape', null);
    }
  }
};
</script>

<style scoped>
  .magnet {
    display: contents;
    background: rgba(133, 133, 133, .4);
  }
</style>
