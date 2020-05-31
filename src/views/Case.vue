<template>
  <page>
    <div class="case">
      <top-header :item="item" />
      <section-quote v-bind="item.quote" />
      <section-factory
        v-for="(section, key) in item.sections"
        :key="key"
        :item="section" />
      <section-info :info="item.info" />
    </div>
  </page>
</template>

<script>
import Page from '@/components/Page';
import TopHeader from '@/components/TopHeader/TopHeader';
import SectionFactory from '@/components/Page/Section/SectionFactory';
import SectionQuote from '@/components/Page/Section/SectionQuote';
import SectionInfo from '../components/Page/Section/SectionInfo';

export default {
  name: 'Case',
  components: {
    SectionInfo,
    SectionQuote,
    SectionFactory,
    TopHeader,
    Page
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showContent: false
    };
  },
  computed: {
    item () { return this.$store.getters.case(this.slug); }
  },
  created () {
    this.$store.commit('setScrollable', false);
  }
};
</script>

<style lang="scss" scoped>
  .case { width: 100%; }
</style>
