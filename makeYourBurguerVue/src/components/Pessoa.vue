<script>
import FormVue from './Form.vue'
import InfoVue from './Info.vue'

export default {
  name: 'Pessoa',
  data() {
    return {
      nome: 'Pessoa top ó'
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
    <InfoVue />
    <FormVue />
  </div>
</template>
