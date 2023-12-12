<script>
export default {
  name: 'Message',
  props: ['msg']
}
</script>

<template>
  <div class="message-container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.message-container {
  font-size: 10px;
  color: var(--white-color);
  background-color: var(--background-message);
  padding: 8px 6px;
  border-radius: 3px;
  max-width: 400px;
}

h1:first-letter {
  text-transform: capitalize;
}
</style>
