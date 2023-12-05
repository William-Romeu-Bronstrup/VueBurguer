<script>
import PictureVue from './Picture.vue'

export default {
  name: 'InfoPessoa',
  data() {
    return {
      backend_tecnologies: ['JS', 'PHP', 'VUE JS | SVELTE'],
      front_tecnologies: [
        { id: 1, language: 'JS' },
        { id: 2, language: 'HTML' },
        { id: 3, language: 'CSS' }
      ],
      isWorking: true,
      email: 'emailfake@gmail.com',
      meu_link: 'https://github.com/William-Romeu-Bronstrup',
      toggleEmailMessage: 'Esconder',
      toggleEmail: true
    }
  },
  props: {
    compEmail: ''
  },
  methods: {
    hasknowledgeBack() {
      return this.hasknowledgeBack.length != 0
    },
    hasknowledgeFront() {
      return this.hasknowledgeFront.length != 0
    }
  },
  components: {
    PictureVue
  }
}
</script>

<template>
  <div>
    <h1>Emails:</h1>
    <li v-for="email in compEmail" :key="email">
      {{ email }}
    </li>

    <p class="working" v-if="isWorking">Estou trabalhando no momento.</p>
    <p v-else>Em busca de novas oportunidades!</p>

    <div>
      <p class="colorRed" v-show="toggleEmail">Mande uma mensagem para {{ email }}</p>
      <input type="checkbox" checked v-model="toggleEmail" />
    </div>

    <p>Para acessar meu portfólio <a v-bind:href="meu_link">Clique aqui!</a></p>
    <PictureVue />

    <p>Utilizo as seguintes tecnologias backend:</p>
    <ul v-if="hasknowledgeBack">
      <li v-for="languages in backend_tecnologies" :key="languages">
        {{ languages }}
      </li>
    </ul>

    <p>Utilizo as seguintes tecnologias front:</p>
    <ul v-if="hasknowledgeFront">
      <li v-for="languages in front_tecnologies" :key="languages.id">
        {{ languages.language }}
      </li>
    </ul>
  </div>
</template>
