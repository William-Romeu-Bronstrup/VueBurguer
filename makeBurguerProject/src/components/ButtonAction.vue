<script>
export default {
  name: 'ButtonAction',
  props: ['text']
}
</script>

<template>
  <button type="button" class="actionButton">{{ text }}</button>
</template>

<style scoped>
.actionButton {
  background-color: var(--color-error);
  border: none;
  border-radius: 3px;
  color: var(--white-color);
  font-weight: 700;
  font-size: 14px;
  height: 100%;
  width: 100%;
}

.actionButton:hover {
  cursor: pointer;
}
</style>
