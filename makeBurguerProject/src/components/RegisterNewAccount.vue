<script>
import InputTextVue from './InputText.vue'
import InputPasswordVue from './InputPassword.vue'
import ButtonSubmitVue from './ButtonSubmit.vue'

import { auth, db, addDoc, collection } from '@/services/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { toast } from 'vue3-toastify'

export default {
  name: 'Login',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      waitUserLogin: false,
      errors: []
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
      this.validator(this.displayName, this.email, this.password)

      if (this.errors.length != 0) {
        return
      }

      let user = null
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          user = userCredential.user
        })
        .then(async () => {
          await updateProfile(user, {
            displayName: this.displayName
          })

          const saveUser = await addDoc(collection(db, 'users'), {
            email: user.email,
            uid: user.uid,
            userType: 'common'
          })

          if (saveUser.id) {
            this.$store.commit('currentLogin', user)

            toast.success('Conta criada com sucesso!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
              limit: 1,
              multiple: false
            })
          }

          // Preciso salvar esse usuário em uma coleção users
          // Quando o usuário fazer o login eu preciso verificar nessa users para ver sua permissão
          // Deixo essa permissão em um getter no main.js
          // Quando eu precisa apenas verifico o valor desse getter
          // Um admin somente cria outro admin
          // CUSTOM USER -> Meus Pedidos
          // ADMIN -> Pedidos

          this.resetData()
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)

          if (errorMessage.includes('email-already-in-use')) {
            this.errors.push('Email já cadastrado.')
            this.$emit('errorHandler', this.errors)
          } else {
            toast.error('Ocorreu um erro inesperado!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
              limit: 1,
              multiple: false
            })
          }
        })
    },
    validator(displayName, email, password) {
      this.errors = []

      if (displayName.length <= 0) {
        this.errors.push('Tamanho inválido!')
      }

      if (displayName.length > 60) {
        this.errors.push('Seu nome atingiu o máximo de 60 caracteres!')
      }

      if (!this.regexToValidateEmail(email)) {
        this.errors.push('Email inválido!')
      }

      if (password.length < 6) {
        this.errors.push('Digite uma senha com mais de 6 dígitos!')
      }

      if (!this.hasSpecialCharacters(password)) {
        this.errors.push('Digite uma senha com pelo menos um caracter especial!')
      }

      this.$emit('errorHandler', this.errors)
    },
    hasSpecialCharacters(password) {
      let regex = /[^a-zA-Z0-9]/

      return regex.test(password)
    },
    regexToValidateEmail(email) {
      let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi

      return regex.test(email)
    },
    resetData() {
      this.displayName = ''
      this.email = ''
      this.password = ''
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
