<script>
export default {
  name: 'ButtonAction',
  props: {
    text: {
      required: true,
      type: String
    },
    costumizedClass: String,
    disabled: Boolean
  },
  emits: ['action']
}
</script>

<template>
  <button type="button" :class="costumizedClass" @click="$emit('action')" :disabled="disabled">
    <slot name="icon" />

    <span>{{ text }}</span>
  </button>
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

.google {
  background-color: var(--white-color);
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid var(--color-loginGoogle);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: var(--color-loginGoogle);
}

.google:hover {
  cursor: pointer;
  background-color: var(--color-loginGoogle);
  color: var(--white-color);
  transition: background 300ms;
}

.google span {
  font-weight: 600;
  font-size: 14px;
  font-family: 'Poppins';
}

.google:disabled {
  background-color: #b8b8b8;
  color: #e6e6e6;
  border: 1px solid #b8b8b8;
  cursor: not-allowed;
}

.signOut {
  background-color: var(--white-color);
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid var(--color-error-hover);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: var(--color-error-hover);
}

.signOut:hover {
  cursor: pointer;
  background-color: var(--color-error);
  border: 1px solid var(--color-error);
  color: var(--white-color);
  transition: background 300ms;
}

.signOut:disabled {
  background-color: #b8b8b8;
  color: #e6e6e6;
  border: 1px solid #b8b8b8;
  cursor: not-allowed;
}

.signOut span {
  font-weight: 600;
  font-size: 14px;
  font-family: 'Poppins';
}
</style>
