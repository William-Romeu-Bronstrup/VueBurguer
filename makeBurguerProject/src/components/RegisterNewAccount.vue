<script>
import InputTextVue from './InputText.vue'
import InputPasswordVue from './InputPassword.vue'
import ButtonSubmitVue from './ButtonSubmit.vue'

import { toast } from 'vue3-toastify'

export default {
  name: 'Login',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      waitUserLogin: false,
      errors: {
        name: '',
        error: ''
      }
    }
  },
  components: {
    InputTextVue,
    InputPasswordVue,
    ButtonSubmitVue
  },
  emits: ['errorHandler'],
  methods: {
    newAccount() {
      //validar os campos
      this.validator(this.displayName)
      //Logica com o firebase para criar uma conta e atualizar algo se necessário
    },
    validator(displayName) {
      if (displayName.length == 0) {
        this.errors.name = 'DisplayName'
        this.errors.error = 'Senha fraca'
      }

      this.errors.name = 'DisplayName'
      this.errors.error = 'Senha fraca'

      this.$emit('errorHandler', this.errors)
    }
  },
  computed: {
    IsUserLogged() {
      return this.$store.getters.getAuth
    },
    checkLoginValues() {
      if (this.email != '' && this.password != '' && this.displayName != '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<template>
  <form action="/login" method="POST" @submit.prevent="newAccount" class="container-form">
    <div class="box">
      <label for="displayNameId" class="labelInputs">Nome:</label>
      <InputTextVue
        v-model.trim="displayName"
        id="displayNameId"
        name="displayName"
        required="true"
        placeholder="Como gostaria de ser chamado?"
        class=""
      />
    </div>

    <div class="box">
      <label for="emailId" class="labelInputs">Email:</label>
      <InputTextVue
        type="email"
        v-model.trim="email"
        id="emailId"
        name="email"
        required="true"
        placeholder="abc@gmail.com"
      />
    </div>

    <div class="box">
      <label for="passwordId" class="labelInputs">Senha:</label>
      <InputPasswordVue
        v-model.trim="password"
        id="passwordId"
        name="password"
        required="true"
        placeholder="Digite sua melhor senha!"
        icon="true"
      />
    </div>

    <ButtonSubmitVue text="Cadastrar!" :disabled="checkLoginValues" />
  </form>
</template>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: fit-content;
  width: 80%;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.error {
  background-color: var(--color-error);
  color: var(--white-color);
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
