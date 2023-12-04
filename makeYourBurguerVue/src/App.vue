<script>
import HeaderVue from './components/Header.vue'
import LifeCycleVue from './components/LifeCycle.vue'
import PessoaVue from './components/Pessoa.vue'
import PrimeiroComponenteVue from './components/PrimeiroComponente.vue'

export default {
  name: 'App',
  components: {
    PrimeiroComponenteVue,
    LifeCycleVue,
    PessoaVue,
    HeaderVue
  },
  data() {
    return {
      teste: 'Apenas Teste'
    }
  }
}
</script>

<template>
  <div>
    <HeaderVue />
    <PrimeiroComponenteVue />
    <LifeCycleVue />
    {{ teste }}
    <PessoaVue />
  </div>
</template>

<style>
.working {
  background-color: red;
}

.colorRed {
  color: red;
}

body {
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
