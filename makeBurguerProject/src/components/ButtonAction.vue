<script>
export default {
  name: 'ButtonAction',
  props: ['text', 'costumizedClass'],
  emits: ['action']
}
</script>

<template>
  <button type="button" :class="costumizedClass" @click="$emit('action')">{{ text }}</button>
</template>

<style scoped>
.cancel {
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

.cancel:hover {
  cursor: pointer;
  background-color: var(--color-error-hover);
  transition: background 200ms ease-in;
}

.confirm {
  background-color: var(--color-confirm);
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

.confirm:hover {
  cursor: pointer;
  background-color: var(--color-confirm-hover);
  transition: background 200ms ease-in;
}
</style>
