<script>
import ButtonActionVue from '../components/ButtonAction.vue'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../services/firebaseConfig.js'

import { toast } from 'vue3-toastify'

export default {
  name: 'LoginWithGoogle',
  components: {
    ButtonActionVue
  },
  props: {
    statusLogin: Object,
    isLogging: Boolean
  },
  data() {
    return {
      logging: false
    }
  },
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      this.logging = true

      signInWithPopup(auth, provider)
        .then((result) => {
          this.logging = false
          this.$store.commit('currentLogin', result.user)

          toast.success('Login realizado com sucesso!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
        .catch((error) => {
          if (error.code.includes('closed-by-user')) {
            toast.error('Login cancelado pelo usuário!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT
            })
          } else {
            toast.error('Falha ao realizar o login!', {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_RIGHT,
              limit: 1,
              multiple: false
            })
          }

          this.logging = false
        })
    }
  }
}
</script>

<template>
  <div class="container-button">
    <ButtonActionVue
      :text="statusLogin ? 'Trocar de conta' : 'Logar com o Google'"
      :disabled="logging || isLogging"
      costumizedClass="google"
      costumizedIconClass="googleIcon"
      @action="signInWithGoogle"
    >
      <template #icon>
        <font-awesome-icon :icon="['fab', 'google']" class="googleIcon" />
      </template>
    </ButtonActionVue>
  </div>
</template>

<style scoped>
.container-button {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.googleIcon {
  font-size: 20px;
}
</style>
