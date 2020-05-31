<template>
  <section class="section quote-section">
    <h3 class="quote__text" data-delay="0">
      “{{ text }}„
    </h3>
    <h4 class="quote__author" data-delay=".2">
      - {{ author }} -
    </h4>
    <img
      alt="quote-logo"
      data-delay=".4"
      class="quote__logo"
      :src="logo" />
  </section>
</template>

<script>
export default {
  name: 'SectionQuote',
  props: {
    text: { type: String, required: true },
    author: { type: String, required: true },
    logo: { type: String, required: true }
  }
};
</script>

<style scoped>
  .quote-section {
    padding: 3rem 2rem 0;
    text-align: center;
  }
  .quote__text {
    font-size: 24px;
    margin-bottom: 2rem;
  }
  .quote__author {
    font-size: 18px;
    margin-bottom: 3rem;
  }
</style>
