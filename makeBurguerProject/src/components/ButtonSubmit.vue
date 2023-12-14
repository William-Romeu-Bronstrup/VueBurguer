<script>
export default {
  name: 'ButtonSubmit',
  props: ['text', 'disabled']
}
</script>

<template>
  <button type="submit" class="buttonSubmit" :disabled="disabled">
    {{ text }}
  </button>
</template>

<style scoped>
.buttonSubmit {
  width: 100%;
  border-radius: 4px;
  background-color: var(--background-button-submit);
  color: var(--white-color);
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 15px;
  border: none;
  padding: 10px 8px;
  transition: background 300ms;
}

.buttonSubmit:hover {
  cursor: pointer;
  background-color: var(--background-button-submit-hover);
  transition: background 200ms;
}

.buttonSubmit:disabled {
  background-color: var(--background-disabled-button);
  color: var(--color-disabled-button);
  cursor: not-allowed;
}
</style>
