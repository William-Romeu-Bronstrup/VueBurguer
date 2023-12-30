<script>
import LoginWithGoogleVue from '../components/LoginWithGoogle.vue'

export default {
  name: 'Login',
  components: {
    LoginWithGoogleVue
  },
  computed: {
    IsUserLogged() {
      return this.$store.getters.getAuth
    }
  }
}
</script>

<template>
  <div class="main-container">
    <div class="box">
      <h1>
        {{ IsUserLogged ? 'logado com o Google!' : 'Faça o login com o Google!' }}
      </h1>

      <div class="buttons">
        <LoginWithGoogleVue :statusLogin="IsUserLogged" />
      </div>
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

  padding: 10px;

  min-width: 250px;
  width: 60%;
}

.box h1 {
  color: var(--color-black-80);
  margin-bottom: 70px;
  font-family: 'Poppins';
}

.buttons {
  min-width: fit-content;
  width: 60%;
}
</style>
