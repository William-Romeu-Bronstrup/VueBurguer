<script>
export default {
  name: 'LifeCycle',
  data() {
    return {
      nome: 'Nome default'
    }
  },
  created() {
    setTimeout(() => {
      this.nome = 'Nome do banco'
    }, 1000)
  },
  mounted() {
    setTimeout(() => {
      this.nome = 'Pedro'
    }, 2000)
  }
}
</script>

<template>
  <p>{{ nome }}</p>
</template>
