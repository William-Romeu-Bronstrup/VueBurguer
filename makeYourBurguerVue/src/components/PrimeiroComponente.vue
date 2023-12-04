<template>
  <div>
    <h1>Olá Vue!! {{ nome }} está iniciando com Vue JS!</h1>
    <p>{{ profissao }}</p>
  </div>
</template>

<script>
export default {
  name: 'PrimeiroComponente',
  data() {
    return {
      nome: 'William',
      profissao: 'Front-end'
    }
  },
  created() {
    this.nome = 'Created name'
  }
}
</script>
