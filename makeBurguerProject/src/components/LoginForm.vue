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
      waitUserLogin: false
    }
  },
  components: {
    InputTextVue,
    InputPasswordVue,
    ButtonSubmitVue
  },
  emits: ['isLogging', 'error'],
  methods: {
    signWithEmailAndPassword() {
      this.waitUserLogin = true
      this.$emit('isLogging', true)

      try {
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            this.$store.commit('currentLogin', userCredential.user)
            this.$emit('error', '')

            toast.success('Login realizado com sucesso!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT
            })
          })
          .catch((error) => {
            const errorCode = error.code

            if (errorCode == 'auth/invalid-credential') {
              this.$emit('error', 'Credenciais inválidas!')
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
</style>
