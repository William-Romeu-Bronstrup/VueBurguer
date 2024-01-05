<script>
import LoginWithGoogleVue from '../components/LoginWithGoogle.vue'
import SignOutVue from '../components/SignOut.vue'
import LoginFormVue from '../components/LoginForm.vue'

import { auth, signInWithEmailAndPassword } from '../services/firebaseConfig.js'

import { toast } from 'vue3-toastify'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLogging: false,
      userEmail: ''
    }
  },
  components: {
    LoginWithGoogleVue,
    SignOutVue,
    LoginFormVue
  },
  methods: {
    signWithEmailAndPassword() {
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
          const errorMessage = error.message

          console.log(error)
        })
    },
    isLoggingMethod(status) {
      this.isLogging = status
    }
  },
  computed: {
    IsUserLogged() {
      const { email } = this.$store.getters.getAuth || ''

      this.userEmail = email

      return this.$store.getters.getAuth
    }
  }
}
</script>

<template>
  <div class="main-container">
    <div class="box">
      <h1>
        {{ IsUserLogged ? `Você está autenticado!` : 'Escolha sua forma de login' }}
      </h1>

      <LoginFormVue @isLogging="isLoggingMethod" v-if="!IsUserLogged" />

      <div class="others-box" v-if="!IsUserLogged">
        <div class="sides"></div>
        <span>ou</span>
        <div class="sides"></div>
      </div>

      <div class="buttons">
        <LoginWithGoogleVue :statusLogin="IsUserLogged" :isLogging="isLogging" />
        <SignOutVue :statusLogin="IsUserLogged" v-if="IsUserLogged" />
      </div>

      <span class="withoutAccount"
        >Sem conta ainda?
        <RouterLink class="navigationLink" to="/register-account"
          >Então crie a sua! <font-awesome-icon :icon="['fas', 'circle-arrow-right']" /></RouterLink
      ></span>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  border: none;
  border-radius: 4px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

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

.buttons {
  min-width: fit-content;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.others-box {
  width: 60%;
  margin: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.others-box span {
  color: #bebebe;
  font-weight: 600;
  font-size: 16px;
  text-transform: lowercase;
}

.sides {
  margin: 8px;
  background-color: #ccc;
  border-radius: 999px;
  width: 50%;
  height: 3px;
}

.withoutAccount {
  margin: 12px 0px 0px 0px;
  color: var(--color-black-90);
  font-weight: 600;
}
</style>
