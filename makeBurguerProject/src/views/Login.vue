<script>
import { auth } from '../services/firebaseConfig.js'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'Login',
  data() {
    return {
      isLogged: null
    }
  },
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken

          const user = result.user

          //this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)

          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email

          console.log(errorCode, errorMessage, email)
        })
    },
    checkIsLogged() {
      onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
          this.isLogged = true
        } else {
          this.isLogged = false
        }
      })
    }
  },
  created() {
    this.checkIsLogged()
  }
}
</script>

<template>
  <div class="main-container">
    <h1>Tela de Login</h1>
    <button @click="signInWithGoogle">Logar com o google</button>
    <h1>{{ isLogged }}</h1>
  </div>
</template>

<style scoped></style>
