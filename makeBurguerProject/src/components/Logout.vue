<script>
export default {
  name: 'Logout',
  emits: ['signOut']
}
</script>

<template>
  <button class="buttonSignOut" @click="$emit('signOut')" aria-label="Deslogar / Sair">
    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="lg" />
  </button>
</template>

<style scoped>
.buttonSignOut {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  color: var(--header-navigation-a);
}

.buttonSignOut:hover {
  cursor: pointer;
  color: var(--white-color);
  transition: all 200ms;
}
</style>
