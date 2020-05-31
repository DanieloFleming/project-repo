<template>
  <div class="case-preview" @click="showCase">
    <div class="case-preview-container" :style="backgroundImage">
      <div class="sides side-a">
        <figure class="preview preview-a" :style="backgroundImage"></figure>
      </div>
      <div class="sides side-b">
        <figure class="preview preview-b" :style="backgroundImage"></figure>
      </div>
    </div>
    <h2 class="case-preview__title" v-html="label"></h2>
  </div>
</template>

<script>
export default {
  name: 'CasePreview',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    backgroundImage () {
      const { cover } = this.item;
      if (cover) {
        return { backgroundImage: `url(${cover})` };
      }
      return null;
    },
    label () {
      const { splitTitle, item: { shortTitle } } = this;
      return shortTitle.split('-').map(splitTitle).join('');
    }
  },
  methods: {
    showCase () {
      const { slug } = this.item;
      this.$router.push('/cases/' + slug);
    },
    splitTitle (part, index) {
      return `<span class="label label-part-${index}">${part}</span>`;
    }
  }
};
</script>

<style lang="scss" scoped>
.case-preview,
.preview {
  overflow:hidden;
  background-color: black;
  transform: translate3d(0, 0, 0);
  contain: layout paint;
}

.case-preview {
  height:calc(50vw / 1.5);
  position:relative;
  width:50vw;
}

.case-preview:after,
.case-preview-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.case-preview:after {
  content: '';
  background-color: rgba(0, 0, 0, .5);
  opacity: .2;
  transition: opacity .2s ease;
  transform: translateZ(0);
}

.case-preview-container {
  transform: scale(1.5);
  background-size: cover;
  background-position: center;
}

.sides {
  width: 100%;
  height: 50%;
  overflow: hidden;
  position: absolute;
  transform: rotateZ(-45deg);
  transition: transform .2s ease;
}

.side-a {
  transform: rotateZ(-45deg) translateX(-10%);
  transform-origin: 50% 100%;
  top:0;
}

.side-b {
  transform: rotateZ(-45deg) translateX(10%);
  transform-origin: 50% 0;
  top: 50%;
}

.preview {
  position:absolute;
  transform: rotateZ(45deg);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200%;
}

.preview-b {
  top: -100%;
}

.case-preview__title {
  position: absolute;
  font-size: 48px;
  color: #fff;
  text-transform: uppercase;
  left: 140px;
  bottom: 60px;
  opacity: 1;
  transition: transform .3s,opacity .3s;
  z-index: 1;
}
.case-preview__title:before {
  content: 'view';
  position: absolute;
  left: -120px;
  bottom: 40px;
  transition: transform .3s,opacity .3s;
  opacity: 0;
}
.case-preview:hover {
  .sides {
    transform: rotateZ(-45deg) translateX(0);
    transition: transform .2s ease;
  }
  &:after {
    opacity: 1;
    transition: opacity .2s ease;
  }

  .case-preview__title,
  .case-preview__title:before {
    opacity: 1;
    transform: translateY(40px);
    transition: transform .3s,opacity .3s;
  }
}
@media(max-width: 768px) {
  .case-preview {
    width: 100vw;
    height: calc(100vw / 1.5);

  }
}
</style>
