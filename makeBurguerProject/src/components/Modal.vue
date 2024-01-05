<script>
export default {
  name: 'Modal',
  props: ['open']
}
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-if="open">
      <div class="modal-container">
        <section>
          <slot name="section" />
        </section>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--shadow-modal);
  display: flex;
  transition: opacity 0.3s ease;
  padding: 1em;
}

.modal-container {
  width: 450px;
  margin: auto;
  padding: 1em;
  background-color: var(--white-color);
  border-radius: 4px;
  box-shadow: 0 2px 8px var(--shadow-modal);
  transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
