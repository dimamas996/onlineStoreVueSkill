<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input type="text" v-model.number="amount"/>

    <button type="button" aria-label="Добавить один товар" @click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'QuantityToggle',
  props: {
    value: Number,
  },
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    increment() {
      this.amount += 1;
    },
    decrement() {
      if (this.amount === 1) return;
      this.amount -= 1;
    },
  },
};
</script>
