<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" :style="{'cursor': (amount <= 1) ? 'not-allowed' : 'pointer'}" :disabled="amount <= 1" @click="change(amount - 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input @blur="change($event.target.value)" type="text" v-model="amount"/>
    <button type="button" aria-label="Добавить один товар" :style="{'cursor': 'pointer'}" @click="change(amount + 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import isValidNumber from '@/helpers/isValidNumber';

export default {
  name: 'QuantityToggle',
  props: ['productAmount'],
  computed: {
    amount: {
      get() {
        return this.productAmount;
      },
      set(newValue) {
        if (this.isValidNumber(newValue)) {
          this.$emit('changer', newValue);
        }
      },
    },
  },
  methods: {
    change(newValue) {
      if (this.isValidNumber(+newValue)) {
        this.amount = +newValue;
      }
    },
    isValidNumber,
  },
};
</script>
