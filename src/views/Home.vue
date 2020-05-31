<template>
  <div class="home">
    <magnet style="width: 200px; height: 300px; top: 20px; left: 100px; position: absolute" />
    <magnet style="width: 200px; height: 300px; top: 30px; left: 500px; position: absolute" />
    <magnet style="width: 100px; height: 200px; top: 40px; left: 400px; position: absolute" />
  </div>
</template>

<script>
import Magnet from '../components/Magnet';
export default {
  name: 'Home',
  components: { Magnet }
};
</script>
<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    min-height: 100vw;
    position: relative;
    background-color: black;
  }
  .background {
    width: 100%;
    height: 100vh;
  }
  .bg, .bg:before {
    width: 100%;
    height: 100vh;

    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    background-image: url('/assets/cases/tanya-heath/cover.jpg');
  }
  .bg:before {
    content: '';
    position: absolute;
    background: black;
    opacity: .4;
  }

  .demo-link {
    display:inline;
  }
</style>
