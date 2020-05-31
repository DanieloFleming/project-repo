<template>
  <section
    id="section-vue"
    :class="className"
    :style="sectionStyle"
    class="section-html"
    v-html="content">
  </section>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'SectionVue',
  props: {
    content: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: null
    },
    sectionStyle: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.vueInstnce = new Vue({
      store: this.$store,
      template: this.$el.outerHTML
    }).$mount(this.$el);
  },
  destroyed () {
    this.vueInstnce.$destroy();
  }
};
</script>
