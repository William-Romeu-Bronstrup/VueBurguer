<script>
export default {
  name: 'Profile',
  props: ['userData'],
  data() {
    return {
      pathDefaultImage: '/img/user.png'
    }
  }
}
</script>

<template>
  <div class="container-profile">
    <figure class="container-photo">
      <img v-if="userData.photoURL" :src="userData.photoURL" :alt="userData.displayName" />
      <img v-else :src="pathDefaultImage" alt="Imagem padrão" width="64px" height="40px" />
    </figure>

    <div class="details-user">
      <h4>{{ userData.displayName }}</h4>
      <span>{{ userData.email }}</span>
    </div>
  </div>
</template>

<style scoped>
.container-profile {
  display: flex;
  max-height: 80px;
  overflow: hidden;
  padding: 4px;
  gap: 12px;
}

.details-user {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.details-user h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-black-90);
}

.details-user span {
  font-size: 14px;
  font-weight: 600;
  color: #595959;
}

.container-photo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-photo img {
  border-radius: 999px;
  border: 2px solid var(--color-subtitle);
  width: 36px;
}
</style>
