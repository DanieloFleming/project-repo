<template>
  <div class="accordion" :class="loadedState">
    <div class="accordion__background">
      <figure
        v-for="(fragment, i) in fragments"
        :key="i"
        class="accordion__fragment"
        :style="fragment"
        @animationend="checkIteration">
      </figure>
    </div>
    <glitch-image
      :image="imageUrl"
      class="accordion__original" :style="loadBackground" />
  </div>
</template>

<script>
import GlitchImage from '../GlitchEffects/GlitchImage';
export default {
  name: 'HeaderAccordion',
  components: { GlitchImage },
  props: {
    item: {
      type: Object,
      required: true
    },
    reverse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      iterationCount: 0,
      fragmentCount: 7,
      fragments: [],
      loaded: false
    };
  },
  computed: {
    imageUrl () {
      return this.item.cover;
    },
    loadBackground () {
      return {
        opacity: Number(this.loaded)
      };
    },
    loadedState () {
      return this.loaded ? 'on' : null;
    },
    direction () {
      return this.reverse
        ? this.delayFromRight
        : this.delayFromLeft;
    }
  },
  mounted () {
    window.addEventListener('resize', this.setImageData.bind(this));
    this.setImageData();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setImageData);
  },
  methods: {
    setImageData () {
      if (this.backgroundImage) {
        return this.setDimensions(this.backgroundImage);
      }

      const backgroundImage = new Image();
      backgroundImage.src = this.imageUrl;
      backgroundImage.onload = function () {
        this.backgroundImage = backgroundImage;
        this.setDimensions(backgroundImage);
      }.bind(this);
    },
    setDimensions ({ width, height }) {
      const { clientWidth, clientHeight } = this.$el;
      const fraction = (clientHeight - height) / height;
      const newWidth = fraction > 0
        ? width * (1 + fraction)
        : width + (width * fraction);

      this.createFragments(Math.max(newWidth, clientWidth));
    },
    createFragments (imageWidth) {
      const { imageUrl, fragmentCount, direction } = this;
      const fragments = [];
      const clientWidth = this.$el.clientWidth;
      const fragmentWidth = clientWidth / fragmentCount;
      const offset = (Math.max(clientWidth, imageWidth) - Math.min(clientWidth, imageWidth)) / 2;
      for (let i = 0; i < this.fragmentCount; i++) {
        fragments.push({
          backgroundPosition: (-fragmentWidth * i) - offset + 'px center',
          backgroundSize: `${imageWidth}px auto`,
          backgroundImage: `url( ${imageUrl})`,
          width: fragmentWidth + 1 + 'px',
          left: fragmentWidth * i + 'px',
          animationDelay: direction(0.05, i, fragmentCount)
        });
      }

      this.fragments = fragments;
    },
    delayFromLeft: (delay, i, _) => delay * i + 's',
    delayFromRight: (delay, i, count) => delay * (count - i) + 's',
    checkIteration () {
      this.iterationCount++;

      if (this.iterationCount === this.fragmentCount) {
        this.loaded = true;
        this.$emit('complete');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  height: 100%;
  position: relative;
}
.accordion::after {
  content: '';
  opacity: 0;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
}
.accordion.on::after {
  opacity: 1;
  transition: opacity 0.4s ease;
}
.accordion.on .accordion__original {
  transform: scale(1, 1);
  transition: transform 2s ease;
}
.accordion__background,
.accordion__original {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: scale(1.1, 1.1);
}
.accordion__original {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.accordion__fragment {
  position: absolute;
  height: 100%;
  opacity: 0;
  animation-name: trail;
  animation-duration: .6s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  background: black;
  overflow: hidden;
}
.accordion__fragment:after {
 // content: '';
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}

@keyframes trail {
  0% {
    opacity: 0;
    transform: scale(1.5, 1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

</style>
