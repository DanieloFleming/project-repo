<template>
  <section class="section section-info">
    <template v-for="(content, title) in info">
      <div class="info-block">
        <h3 class="info-block__title">
          {{ title }}
        </h3>
        <div class="info-block__content">
          <div class="info" v-html="getContent(content)"></div>
        </div>
      </div>
    </template>
    <div v-if="isOdd" class="info-block space-filler"></div>
  </section>
</template>

<script>
export default {
  name: 'SectionInfo',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    isOdd () {
      return this.info % 2 !== 0;
    }
  },
  methods: {
    getContent (content) {
      if (typeof content === 'string') {
        return `<span class="info__text">${content}</span>`;
      }
      if (content instanceof Array) {
        return content.map(this.getContent).join('');
      }
      if (content.link) {
        return this.createLink(content.link);
      }
    },
    createLink ({ label, url }) {
      return `
         <a class="info__link" target="_blank" href="${url}">${label}</a>
      `;
    }
  }
};
</script>

<style scoped>
  .section-info {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    justify-content: center;
    background-color: #000;
  }
  .info-block {
    width: 40%;
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }

  .info-block__title {
    color: white;
    font-size: 16px;
  }
  .info-block__title:after {
    content: '';
    display: block;
    margin: 20px 0;
    width: 100%;
    height: 3px;
    background: white;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .info-block__content {
    text-align: left;
    display: flex;
    flex-direction: column;
    color: #fff;
  }
</style>
<style lang="scss">
  a {
    position: relative;
    text-transform: capitalize;
    padding:5px;
    display: inline-block;
    transition: color .2s ease;
    font-weight: bold;
    overflow: hidden;
  }
  a:before {
    content:'→';
    display: inline-block;
    margin-right:5px;

  }
  a:after {
    content:'';
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background:white;
    z-index:-1;
    transition:transform .2s ease;
    transform-origin: left;
    transform:scaleX(0);
  }

  a:hover {
    cursor: pointer;
    color:black;
    transition: color .3s ease;
  }

  a:hover:after {
    opacity: 1;
    transform:scaleX(1);
    transition:transform .3s ease;
  }
</style>
