<script>
export default {
  name: 'InputText',
  props: ['id', 'placeholder', 'name', 'modelValue', 'required'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    type="text"
    class="input"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    maxlength="200"
    @input="$emit('update:modelValue', $event.target.value)"
    :required="required == 'true' ? true : false"
  />
</template>

<style scoped>
.input {
  width: 100%;
  padding: 10px 8px;
  border-radius: 4px;
  border: 2px solid #ccc;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins';
}

.input:focus {
  border: 2px solid #3b82f6;
}
</style>
