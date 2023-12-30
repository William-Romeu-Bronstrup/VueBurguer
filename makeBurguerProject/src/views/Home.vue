<script>
import BannerVue from '../components/Banner.vue'
import BurgerFormVue from '../components/BurgerForm.vue'

export default {
  name: 'Home',
  components: {
    BannerVue,
    BurgerFormVue
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.getAuth
    }
  }
}
</script>

<template>
  <div>
    <BannerVue>
      <h1 class="homeTitle">Make Your Burguer</h1>
    </BannerVue>

    <h1 class="title spaceY" v-if="isUserLogged">Monte o seu burger</h1>
    <h1 class="title spaceY" v-else>Faça o login para fazer seu pedido!</h1>

    <BurgerFormVue v-if="isUserLogged" />
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
