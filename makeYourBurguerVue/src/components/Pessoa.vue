<script>
import FormVue from './Form.vue'
import InfoVue from './Info.vue'

export default {
  name: 'Pessoa',
  data() {
    return {
      nome: 'Pessoa top ó',
      emailDinamico: ['Emialdinamico@gmail.com', 'maisum@gmail.com']
    }
  },
  components: {
    InfoVue,
    FormVue
  }
}
</script>

<template>
  <div>
    <h1>{{ nome }}</h1>
    <InfoVue :compEmail="emailDinamico" />
    <FormVue />
  </div>
</template>
