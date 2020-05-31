<template>
  <component :is="component" v-bind="item" class="section" />
</template>

<script>
import SectionShowcase from './SectionShowcase';
import SectionHTML from './SectionHTML';

const sections = {
  undefined: SectionShowcase,
  showcase: SectionShowcase,
  html: SectionHTML
};
export default {
  name: 'SectionFactory',
  components: { SectionShowcase, SectionHTML },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    component () {
      return sections[this.item.component];
    }
  }
};
</script>

<style scoped>
  .section {
    width: 100%;
    padding: 3rem 2rem;
    text-align: center;
  }
  .section.dark {
    background-color: black;
    color: white;
  }
</style>
