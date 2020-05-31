<template>
  <div class="header section">
    <header-accordion
      :style="parallax"
      :item="item"
      @complete="displayContent" />
    <div v-show="showText" class="header-content">
      <glitch-text :duration="2.4" :delay="3.2">
        <h3 class="header__type">
          - {{ item.header.type }} -
        </h3>
      </glitch-text>

      <glitch-text :duration="6" :delay="4.8">
        <h1 class="header__title" v-html="title"></h1>
      </glitch-text>
    </div>
  </div>
</template>

<script>
import HeaderAccordion from './TopHeaderAccordion';
import GlitchText from '../GlitchEffects/GlitchText';
export default {
  name: 'TopHeader',
  components: { GlitchText, HeaderAccordion },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showText: false
    };
  },
  computed: {
    title () {
      const { title } = this.item.header;
      return title.split('_')
        .map(part => `<span class="header__title-inline">${part}</span>`)
        .join('');
    },
    parallax () {
      // const scroll = -this.$store.getters.scrollPosition * 0.5;

      return {
        // transform: `translateY(${scroll}px)`
      };
    }
  },
  methods: {
    displayContent () {
      this.showText = true;
      this.$store.commit('setScrollable', true);
    }
  }
};
</script>

<style lang="scss">
  .accordion {
    transform: translateZ(-1px) scale(2);
  }
  .header {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .header-content {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    text-transform: uppercase;
    color: #fff;
  }

  .header__type {
    font-size: 18px;
    margin-bottom: 2rem;
  }
  .header__title {
    font-size: 80px;
  }
  .header__title /deep/ .header__title-inline {
    display: inline-block;
  }
  @media(min-width: 768px) {
    .header__title {
      font-size: 120px;
    }
  }
</style>
