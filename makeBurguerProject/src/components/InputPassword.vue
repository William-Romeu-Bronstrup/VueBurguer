<script>
export default {
  name: 'InputPassword',
  props: ['id', 'name', 'placeholder', 'modelValue', 'required', 'icon'],
  data() {
    return {
      type: 'password',
      iconType: 'eye'
    }
  },
  emits: ['update:modelValue'],
  methods: {
    changeViewIcon() {
      if (this.type == 'password') {
        this.type = 'text'
        this.iconType = 'eye-slash'
      } else {
        this.type = 'password'
        this.iconType = 'eye'
      }
    }
  }
}
</script>

<template>
  <div class="box-password">
    <input
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />

    <font-awesome-icon
      :icon="['far', iconType]"
      v-if="icon == 'true' ? true : false"
      id="icon-eye"
      @click="changeViewIcon"
    />
  </div>
</template>

<style scoped>
.box-password {
  position: relative;
}

#icon-eye {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
