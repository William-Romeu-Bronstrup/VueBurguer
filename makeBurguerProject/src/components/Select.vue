<script>
export default {
  name: 'Select',
  props: ['id', 'selectedBread', 'breadOptions'],
  emits: ['update:selectedBread', 'update:breadOptions']
}
</script>

<template>
  <select :name="ChosedBread" :id="id" class="select">
    <option v-for="options in breadOptions" :value="options.id" :key="options.id" class="option">
      {{ options.name }}
    </option>
  </select>
</template>

<style scoped>
.select {
  padding: 10px 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins';
  font-weight: 500;
}

.option {
  font-family: 'Poppins';
  font-weight: 500;
}
</style>
