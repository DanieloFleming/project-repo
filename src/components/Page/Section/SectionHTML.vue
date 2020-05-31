<template>
  <section
    :class="className"
    :style="sectionStyle"
    class="section-html"
    v-html="content">
  </section>
</template>

<script>
export default {
  name: 'SectionHTML',
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
  }
};
</script>

<style scoped>

</style>
