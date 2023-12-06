<script>
export default {
  name: 'Navbar',
  props: ['logo', 'alt']
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
