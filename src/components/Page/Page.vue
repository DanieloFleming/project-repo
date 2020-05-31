<template>
  <component :is="component">
    <slot></slot>
  </component>
</template>
<script>
import TouchScrollPage from './TouchScrollPage';
import WheelScrollPage from './WheelScrollPage';

export default {
  name: 'Page',
  components: { WheelScrollPage, TouchScrollPage },
  computed: {
    isMobile () { return this.$store.getters.isMobile; },
    component () {
      return this.isMobile ? TouchScrollPage : WheelScrollPage;
    }
  },
  mounted () {
    const sections = this.$el.querySelectorAll('.section, .header');
    this.sectionCount = sections.length;
    this.intersector = new IntersectionObserver(
      this.observeIntersection.bind(this),
      { threshold: 0.3 }
    );
    sections.forEach(this.observeSection);

    const container = this.$el.querySelector('.scroll-container');
    this.resizor = new ResizeObserver(this.observeResizing.bind(this));
    this.resizor.observe(container);
  },
  beforeDestroy () {
    this.intersector.disconnect();
    this.resizor.disconnect();
    this.sectionCount = null;
  },
  methods: {
    observeSection (intersection) {
      this.intersector.observe(intersection);
    },
    observeIntersection (intersection, observer) {
      intersection.forEach(intersect => {
        if (intersect.isIntersecting) {
          const section = intersect.target;
          section.classList.add('intersected');
          section.querySelectorAll('[data-delay]').forEach(this.transitionElement);

          this.sectionCount--;
          observer.unobserve(section);
          if (this.sectionCount === 0) observer.disconnect();
        }
      });
    },
    transitionElement (element) {
      const delayTime = element.getAttribute('data-delay') || 0;
      element.style.transitionDelay = delayTime + 's';
    },
    observeResizing (resize) {
      resize.forEach(size => {
        this.$store.commit('setPageHeight', size.contentRect.height);
      });
    }
  }
};
</script>
<style lang="scss">
  .page {
    perspective: 1px;
  }
  .section:not(.header) {
    overflow: hidden;
    perspective: 600px;
  }
  .section:not(.intersected) [data-delay] {
    opacity: 0;
    transform: translate3d(0px, 100px, 60px);
  }
  .section.intersected [data-delay]{
    opacity: 1;
    transform: translate3d(0px, 0, 0);
    transition: opacity .4s ease-out, transform .4s ease;
  }
</style>
