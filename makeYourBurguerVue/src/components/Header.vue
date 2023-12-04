<template>
  <header>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Projetos</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  gap: 10px;
}

a {
  color: #ddd;
  text-decoration: none;
  transition: 0.5s;
}

a:hover {
  color: turquoise;
}
</style>
