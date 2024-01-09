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
      userEmail: '',
      messageError: ''
    }
  },
  components: {
    LoginWithGoogleVue,
    SignOutVue,
    LoginFormVue
  },
  methods: {
    isLoggingMethod(status) {
      this.isLogging = status
    },
    handleError(errorName) {
      this.messageError = errorName
    }
  },
  computed: {
    IsUserLogged() {
      return this.$store.getters.getAuth
    },
    hasMessageError() {
      return this.messageError.length != 0 ? true : false
    }
  }
}
</script>

<template>
  <div class="main-container">
    <div class="box">
      <h1 :class="{ hasError: hasMessageError, withOutError: !hasMessageError }">
        {{ IsUserLogged ? `Você está autenticado!` : 'Escolha sua forma de login' }}
      </h1>

      <div class="error" v-if="messageError">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        <span>{{ messageError }}</span>
      </div>

      <LoginFormVue @isLogging="isLoggingMethod" @error="handleError" v-if="!IsUserLogged" />

      <div class="others-box" v-if="!IsUserLogged">
        <div class="sides"></div>
        <span>ou</span>
        <div class="sides"></div>
      </div>

      <div class="buttons">
        <LoginWithGoogleVue :statusLogin="IsUserLogged" :isLogging="isLogging" />
        <SignOutVue :statusLogin="IsUserLogged" v-if="IsUserLogged" />
      </div>

      <span v-if="!IsUserLogged" class="withoutAccount"
        >Sem conta ainda?
        <RouterLink class="navigationLink" to="/register-account"
          >Então crie a sua! <font-awesome-icon :icon="['fas', 'circle-arrow-right']" /></RouterLink
      ></span>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0px;
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
  font-family: 'Poppins';
}

.hasError {
  margin-bottom: 0px;
}

.withOutError {
  margin-bottom: 25px;
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
  margin: 12px 0px 10px 0px;
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

@media (min-width: 401px) {
  .box {
    width: 50vw;
  }
}

@media (max-width: 600px) {
  .box {
    width: 80vw;
  }
}

@media (max-width: 700px) {
  .box h1 {
    font-size: 20px;
  }
}
</style>
