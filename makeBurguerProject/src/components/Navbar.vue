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
  data() {
    return {
      sidebar: false,
      screenWidth: 0
    }
  },
  mounted() {
    this.updateScreenWidth()
    this.onScreenResize()
  },
  methods: {
    handleSignOut() {
      this.$store.commit('signOut')
      this.$router.push('/login')
    },
    toogleSideBar() {
      this.sidebar = !this.sidebar
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth()
      })
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth

      if (this.screenWidth > 600 && this.sidebar) {
        this.sidebar = false
      }
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
  <nav id="transition">
    <div class="groupNav">
      <ul class="container-loggedUser">
        <li>
          <RouterLink to="/">
            <img :src="logo" :alt="alt" id="logo" width="128px" height="128px" />
          </RouterLink>
        </li>
        <li class="box-loggedUser">
          <ProfileVue v-if="getUserData" :userData="getUserData" />
        </li>
      </ul>
      <div>
        <ul id="groupLinks">
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
        </ul>
        <figure>
          <img
            id="menuIcon"
            src="/img/menu.png"
            alt="Imagem representando o menu com três barrinhas pretas em sequência"
            width="40px"
            height="40px"
            @click="toogleSideBar"
          />
        </figure>
      </div>
    </div>

    <div v-if="sidebar" :class="{ sidebar: sidebar }" class="close">
      <figure class="closeBox">
        <img
          id="menuIcon"
          src="/img/closeMenu.png"
          alt="Imagem representando o menu com três barrinhas pretas em sequência"
          width="25px"
          height="25px"
          @click="toogleSideBar"
        />
      </figure>

      <ul class="groupNavMobile">
        <li>
          <RouterLink active-class="active" to="/" class="link">Home</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/pedidos" class="link">Pedidos</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/login" class="link">Login</RouterLink>
        </li>
        <li class="boxLoggedUserMobile">
          <ProfileVue v-if="getUserData" :userData="getUserData" />
        </li>
        <li>
          <LogoutVue @signOut="handleSignOut" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.groupNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.groupNavMobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.closeBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 14px 16px 0px;
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

.boxLoggedUserMobile {
  background-color: var(--white-color);
}

#menuIcon {
  display: none;
}

.close {
  animation: fadeOut 0.3s ease;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  min-height: 100vh;
  background-color: var(--background-header);
  animation: fadeIn 0.3s ease;
  width: 250px;
}

@keyframes fadeIn {
  from {
    width: 0px;
  }
  to {
    width: 250px;
  }
}

@keyframes fadeOut {
  from {
    width: 250px;
  }
  to {
    width: 0px;
  }
}

@media (max-width: 600px) {
  #groupLinks li {
    display: none;
  }

  #menuIcon {
    display: block;
  }

  .box-loggedUser {
    display: none;
  }
}
</style>
