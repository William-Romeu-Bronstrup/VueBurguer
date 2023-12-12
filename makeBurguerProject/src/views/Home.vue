<script>
import BannerVue from '../components/Banner.vue'
import BurgerFormVue from '../components/BurgerForm.vue'

export default {
  name: 'Home',
  components: {
    BannerVue,
    BurgerFormVue
  }
}
</script>

<template>
  <div>
    <BannerVue>
      <h1 class="homeTitle">Make Your Burguer</h1>
    </BannerVue>

    <h1 class="title spaceY">Monte o seu burger</h1>

    <BurgerFormVue />
  </div>
</template>

<style scoped>
.homeTitle {
  font-size: 3em;
  text-shadow: 6px 2px 2px #000;
  font-weight: 800;
  color: var(--white-color);
  padding: 2em;
}

@media (max-width: 767px) {
  .homeTitle {
    padding: 1em;
    font-size: 2.5em;
  }
}
</style>
