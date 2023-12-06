<script>
import BannerVue from '../components/Banner.vue'

export default {
  name: 'Home',
  components: {
    BannerVue
  }
}
</script>

<template>
  <div>
    <banner-vue>
      <h1 class="main-container title">Make Your Burguer</h1>
    </banner-vue>

    <h1 class="main-container" style="margin-top: 90px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odio perferendis dicta
      dolore sunt nesciunt autem iure sed natus, quidem laudantium rem nostrum temporibus mollitia
      qui voluptatem quis. Exercitationem, maiores!
    </h1>
  </div>
</template>
