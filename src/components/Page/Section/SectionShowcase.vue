<template>
  <section class="section section-showcase" :class="sectionType" :style="customBackground">
    <div class="container">
      <img
        data-delay=""
        alt="showcase"
        :src="image"
        :style="imageSettings"
        class="section-showcase__image" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionShowcase',
  props: {
    image: {
      type: String,
      required: true
    },
    maxWidth: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      sectionType: null,
      customBackground: null
    };
  },
  computed: {
    imageSettings () {
      return { maxWidth: this.maxWidth };
    }
  },
  mounted () {
    const background = this.background;

    if (background !== 'light' && background !== 'dark') {
      this.customBackground = { background };
    } else {
      this.sectionType = background;
    }
  }
};
</script>

<style scoped>
  .section-showcase {
    padding: 3rem 2rem;
    text-align: center;
  }
  .section-showcase__image {
    width: 100%;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
