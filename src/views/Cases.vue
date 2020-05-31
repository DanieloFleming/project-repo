<template>
  <page>
    <div class="cases">
      <case-preview
        v-for="(item, i) in cases"
        :key="i"
        :item="item"
        class="case-1" />
    </div>
  </page>
</template>

<script>
import CasePreview from '@/components/CasePreview';
import Page from '@/components/Page';
export default {
  name: 'Cases',
  components: { Page, CasePreview },
  computed: {
    cases () {
      return this.$store.getters.cases;
    }
  },
  mounted () {
    this.$store.commit('setScrollable', true);
  }
};
</script>

<style scoped>
  .cases {
    display: flex;
    min-height: 100%;
    position: relative;
    flex-wrap: wrap;
  }
</style>
