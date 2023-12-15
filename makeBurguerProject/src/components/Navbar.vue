<script>
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebaseConfig.js'
import LogoutVue from './Logout.vue'

export default {
  name: 'Navbar',
  props: ['logo', 'alt'],
  data() {
    return {
      auth: auth
    }
  },
  components: {
    LogoutVue
  },
  methods: {
    handleSignOut() {
      signOut(this.auth).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<template>
  <nav>
    <ul id="groupNav">
      <li>
        <RouterLink to="/">
          <img :src="logo" :alt="alt" id="logo" />
        </RouterLink>
      </li>
      <div id="groupLinks">
        <li>
          <RouterLink to="/" class="link">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/pedidos" class="link">Pedidos</RouterLink>
        </li>
        <li>
          <RouterLink to="/login" class="link">Login</RouterLink>
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

#groupLinks {
  display: flex;
  align-items: center;
  gap: 14px;
}

#logo {
  width: 40px;
  height: 40px;
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
</style>
