<script>
import InputTextVue from './form/InputText.vue'
import SubmitVue from './form/Submit.vue'

export default {
  name: 'Form',
  components: {
    InputTextVue,
    SubmitVue
  }
}
</script>

<template>
  <form action="">
    <h2>Meu formulário:</h2>
    <InputTextVue />
    <InputTextVue />

    <SubmitVue />
  </form>
</template>
