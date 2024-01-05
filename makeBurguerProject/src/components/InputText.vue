<script>
export default {
  name: 'InputText',
  props: ['type', 'id', 'placeholder', 'name', 'modelValue', 'required'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :type="type || 'text'"
    class="input"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    maxlength="200"
    autocomplete="on"
    @input="$emit('update:modelValue', $event.target.value)"
    :required="required == 'true' ? true : false"
  />
</template>

<style scoped>
.error-input {
  border: 2px solid var(--color-error-hover);
}
</style>
