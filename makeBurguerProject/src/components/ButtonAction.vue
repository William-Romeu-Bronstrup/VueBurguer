<script>
export default {
  name: 'ButtonAction',
  props: ['text'],
  emits: ['action']
}
</script>

<template>
  <button type="button" class="actionButton" @click="$emit('action')">{{ text }}</button>
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
  padding: 0px 6px;
  letter-spacing: 0.3px;
}

.actionButton:hover {
  cursor: pointer;
  background-color: var(--color-error-hover);
  transition: background 200ms ease-in;
}
</style>
