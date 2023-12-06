<script>
export default {
  name: 'Banner'
}
</script>

<template>
  <div id="banner">
    <slot></slot>
  </div>
</template>

<style scoped>
#banner {
  background-image: url('/img/burger.jpg');
  background-repeat: no-repeat;
  background-position: 0 -250px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
