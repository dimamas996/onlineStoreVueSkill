<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li v-for="item of products" :key="item.id" class="cart__order">
        <h3>{{ item.title }}</h3>
        <b>{{ item.amount }} x {{ item.price }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>{{ deliveryPrice | numberFormat }} ₽</b></p>
      <p>Итого: <b>{{ positionAmount }}</b> {{ editedWord }} на сумму
        <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <slot/>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import endingEdit from '@/helpers/endingEdit';

export default {
  name: 'CompleteOrderList',
  props: ['products', 'deliveryPrice', 'totalPrice'],
  filters: {
    numberFormat,
  },
  methods: {
    endingEdit,
  },
  computed: {
    editedWord: {
      get() {
        return this.endingEdit(this.positionAmount);
      },
    },
    positionAmount() {
      return this.products.length;
    },
  },
};
</script>
