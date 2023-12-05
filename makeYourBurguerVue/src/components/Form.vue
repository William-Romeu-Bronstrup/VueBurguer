<script>
import InputTextVue from './form/InputText.vue'
import SubmitVue from './form/Submit.vue'

export default {
  name: 'Form',
  components: {
    InputTextVue,
    SubmitVue
  },
  methods: {
    enviarFormulario(e) {
      e.preventDefault()

      console.log('Formulário enviado!')
    }
  }
}
</script>

<template>
  <form action="" @submit="enviarFormulario($event)">
    <h2>Meu formulário:</h2>
    <InputTextVue />
    <InputTextVue />

    <SubmitVue />
  </form>
</template>
