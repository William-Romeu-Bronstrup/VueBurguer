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
    getErros(error) {
      this.erros = error
    }
  },
  computed: {
    existErros() {
      return this.erros.length != 0
    },
    showErros() {
      return this.erros
    }
  }
}
</script>

<template>
  <div class="center">
    <div class="box">
      <h1 class="titleNewAccount" :class="{ space: !existErros }">Crie sua conta!</h1>

      <div class="errors" v-if="existErros">
        <ul class="gap-erros">
          <li v-for="error in showErros" :key="error" class="error-subtitle">
            {{ error }}
          </li>
        </ul>
      </div>

      <RegisterNewAccountVue @errorHandler="getErros" />

      <div class="navigationBox">
        <RouterLink class="navigationLink" to="/login"
          ><font-awesome-icon :icon="['fas', 'circle-arrow-left']" /> Ir para o login</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.center {
  margin: 25px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.titleNewAccount {
  font-size: 24px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 16px 8px;

  min-width: 250px;
  width: 35vw;

  border: none;
  border-radius: 4px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.box h1 {
  color: var(--color-black-80);
  font-family: 'Poppins';
}

.space {
  margin-bottom: 25px;
}

.gap-erros {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.error-subtitle {
  color: var(--white-color);
  font-weight: 500;
  font-size: 14px;
  font-family: 'Poppins';
  flex-wrap: nowrap;
}

.errors {
  height: fit-content;
  max-width: 80%;
  border: 2px solid var(--color-error);
  background-color: var(--color-error-weak);
  border-radius: 4px;
  padding: 8px;
  margin: 26px 0px 8px 0px;
}

.navigationBox {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 12px 0px 0px 0px;
}

@media (max-width: 1000px) {
  .box {
    width: 60vw;
  }
}

@media (max-width: 550px) {
  .box {
    width: 90vw;
  }

  .navigationBox {
    margin-left: 0px;
  }
}

@media (max-width: 700px) {
  .box h1 {
    font-size: 20px;
  }
}
</style>
