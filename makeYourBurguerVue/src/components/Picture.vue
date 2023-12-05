<template>
  <div>
    <img :src="src" :alt="alt" />
    <MudarImagemVue @mudarImagem="mudarImagemFather" />
  </div>
</template>

<script>
import MudarImagemVue from './MudarImagem.vue'

export default {
  name: 'Picture',
  data() {
    return {
      src: '/avatar.jpeg',
      alt: 'Avatar do usuário do github'
    }
  },
  components: {
    MudarImagemVue
  },
  methods: {
    mudarImagemFather() {
      this.src = '/metadinha.jpg'
    }
  }
}
</script>
