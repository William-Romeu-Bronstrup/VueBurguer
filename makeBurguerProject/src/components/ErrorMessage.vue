<script>
export default {
  name: 'ErrorMessage',
  props: ['msg']
}
</script>

<template>
  <p class="error">{{ msg }}</p>
</template>

<style scoped>
.error {
  color: var(--white-color);
  font-weight: 600;
  font-family: 'Poppins';
  font-size: 14px;
  background-color: var(--color-error);
  max-width: fit-content;
  padding: 8px 6px;
  border-radius: 2px;
}
</style>
