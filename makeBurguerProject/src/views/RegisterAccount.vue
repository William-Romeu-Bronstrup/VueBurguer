<script>
import RegisterNewAccountVue from '../components/RegisterNewAccount.vue'

export default {
  name: 'RegisterAccount',
  components: {
    RegisterNewAccountVue
  },
  data() {
    return {
      erros: []
    }
  },
  methods: {
    teste(e) {
      console.log(e, 'teste man')
    }
  },
  computed: {
    existErros() {
      return this.erros.length != 0
    }
  }
}
</script>

<template>
  <div class="main-container">
    <section class="group">
      <div class="box">
        <h1 class="titleNewAccount">Cadastre sua nova conta</h1>

        <RegisterNewAccountVue @errorHandler="teste" />

        <div class="navigationBox">
          <RouterLink class="navigationLink" to="/login"
            ><font-awesome-icon :icon="['fas', 'circle-arrow-left']" /> Ir para o login</RouterLink
          >
        </div>
      </div>
      <div class="errors" v-if="existErros">
        <h1>Erros</h1>
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.titleNewAccount {
  font-size: 24px;
}

.group {
  display: flex;
  align-items: center;

  border: none;
  border-radius: 4px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 16px 8px;

  min-width: 250px;
  width: 35vw;
}

.box h1 {
  color: var(--color-black-80);
  margin-bottom: 40px;
  font-family: 'Poppins';
}

.errors {
  height: fit-content;
  min-width: fit-content;
  width: 150px;
  border: 2px solid gray;
  border-radius: 4px;
}

.navigationBox {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 12px 0px 0px 0px;
}
</style>
