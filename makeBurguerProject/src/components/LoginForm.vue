<script>
import { auth, signInWithEmailAndPassword } from '../services/firebaseConfig.js'

import InputTextVue from './InputText.vue'
import InputPasswordVue from './InputPassword.vue'
import ButtonSubmitVue from './ButtonSubmit.vue'

import { toast } from 'vue3-toastify'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      waitUserLogin: false,
      messageError: ''
    }
  },
  components: {
    InputTextVue,
    InputPasswordVue,
    ButtonSubmitVue
  },
  emits: ['isLogging'],
  methods: {
    signWithEmailAndPassword() {
      this.waitUserLogin = true
      this.$emit('isLogging', true)
      this.messageError = ''

      try {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.$store.commit('currentLogin', userCredential.user)

            toast.success('Login realizado com sucesso!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT
            })
          })
          .catch((error) => {
            const errorCode = error.code

            if (errorCode == 'auth/invalid-credential') {
              this.messageError = 'Credenciais inválidas!'
            }
          })
      } finally {
        this.waitUserLogin = false
        this.$emit('isLogging', false)
      }
    }
  },
  computed: {
    IsUserLogged() {
      return this.$store.getters.getAuth
    },
    checkLoginValues() {
      if (this.email != '' && this.password != '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<template>
  <form
    action="/login"
    method="POST"
    @submit.prevent="signWithEmailAndPassword"
    class="container-form"
  >
    <div class="error" v-if="messageError">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
      <span>{{ messageError }}</span>
    </div>

    <div class="box">
      <label for="emailId" class="labelInputs">Email:</label>
      <InputTextVue
        type="email"
        v-model.trim="email"
        id="emailId"
        name="email"
        required="true"
        placeholder="Digite seu email..."
      />
    </div>

    <div class="box">
      <label for="passwordId" class="labelInputs">Senha:</label>
      <InputPasswordVue
        v-model.trim="password"
        id="passwordId"
        name="password"
        required="true"
        placeholder="Digite sua senha..."
        icon="true"
      />
    </div>

    <ButtonSubmitVue text="Logar" :disabled="waitUserLogin || checkLoginValues" />
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
