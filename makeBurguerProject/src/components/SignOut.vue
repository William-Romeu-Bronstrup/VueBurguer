<script>
import ButtonActionVue from './ButtonAction.vue'

export default {
  name: 'SignOut',
  data() {
    return {
      logging: false
    }
  },
  components: {
    ButtonActionVue
  },
  methods: {
    handleSignOut() {
      this.logging = true
      this.$store.commit('signOut')
      this.logging = false
    }
  }
}
</script>

<template>
  <ButtonActionVue
    text="Sair"
    :disabled="logging"
    costumizedClass="signOut"
    costumizedIconClass="signOutIcon"
    @action="handleSignOut"
  >
    <template #icon>
      <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="lg" />
    </template>
  </ButtonActionVue>
</template>
