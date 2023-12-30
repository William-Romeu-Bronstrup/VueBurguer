<script>
import LogoutVue from './Logout.vue'
import ProfileVue from './Profile.vue'

export default {
  name: 'Navbar',
  props: ['logo', 'alt'],
  components: {
    LogoutVue,
    ProfileVue
  },
  methods: {
    handleSignOut() {
      this.$store.commit('signOut')
      this.$router.push('/login')
    }
  },
  computed: {
    getUserData() {
      return this.$store.getters.getAuth
    }
  }
}
</script>

<template>
  <nav>
    <ul id="groupNav">
      <div class="container-loggedUser">
        <li>
          <RouterLink to="/">
            <img :src="logo" :alt="alt" id="logo" />
          </RouterLink>
        </li>
        <li class="box-loggedUser">
          <ProfileVue v-if="getUserData" :userData="getUserData" />
        </li>
      </div>
      <div id="groupLinks">
        <li>
          <RouterLink active-class="active" to="/" class="link">Home</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/pedidos" class="link">Pedidos</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/login" class="link">Login</RouterLink>
        </li>
        <li>
          <LogoutVue @signOut="handleSignOut" />
        </li>
      </div>
    </ul>
  </nav>
</template>

<style scoped>
#groupNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container-loggedUser {
  display: flex;
  align-items: center;
  gap: 10px;
}

.box-loggedUser {
  background-color: var(--white-color);
  border-radius: 2px;
}

#groupLinks {
  display: flex;
  align-items: center;
  gap: 14px;
}

#logo {
  width: 45px;
  height: 45px;
}

.link {
  font-weight: 700;
  color: var(--header-navigation-a);
}

.link:hover {
  cursor: pointer;
  color: var(--white-color);
  transition: color 200ms;
}

.active {
  color: var(--white-color);
}
</style>
