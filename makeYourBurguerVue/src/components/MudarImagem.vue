<template>
  <div>
    <button @click="$emit('mudarImagem')">Trocar de imagem no filho</button>
  </div>
</template>

<script>
export default {
  name: 'MudarImagem',
  emits: ['mudarImagem']
}
</script>
