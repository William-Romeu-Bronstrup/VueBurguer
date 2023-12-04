<template>
  <img v-bind:src="src" :alt="alt" />
</template>

<script>
export default {
  name: 'Picture',
  data() {
    return {
      src: 'https://github.com/William-Romeu-Bronstrup.png',
      alt: 'Avatar do usuário do github'
    }
  }
}
</script>
