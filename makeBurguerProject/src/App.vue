<script>
import NavbarVue from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    NavbarVue,
    Footer
  },
  data() {
    return {
      img_logo: '/img/logo.png',
      alt: 'Logo com a imagem de um hambúrguer'
    }
  }
}
</script>

<template>
  <div class="layout">
    <main>
      <header id="nav">
        <NavbarVue :logo="img_logo" :alt="alt" />
      </header>

      <section>
        <RouterView />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style>
#nav {
  width: 100%;
  background-color: var(--background-header);
  padding: 1em 2em;
}

.main-container {
  padding: 1em 2em;
}

.title {
  text-align: center;
  color: var(--title-color);
  font-weight: 800;
  font-size: 2em;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
}

.spaceY {
  margin: 40px 0px 15px 0px;
}

.labelInputs {
  font-size: 16px;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 10px 8px;
  border-radius: 4px;
  border: 2px solid var(--border-inputs);
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins';
}

.input:focus {
  border: 2px solid var(--border-select-focus);
}

.navigationLink {
  color: var(--color-navigation);
  font-weight: 600;
  font-size: 16px;
}

.navigationLink:hover {
  color: var(--color-navigation-hover);
  transition: color 250ms;
}
</style>
