<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120"
           :alt="item.title">
    </div>
    <h3 class="product__title">
      {{ item.title }}
    </h3>
    <span class="product__code">Артикул: {{ item.productId }}</span>
    <QuantityToggle
      :product-amount="amount"
      @changer="updateProductAmount"
    />
    <b class="product__price">
      {{ item.price * item.amount | numberFormat }} ₽
    </b>
    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины" @click.prevent="deleteCartProd({ productId: item.productId })">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import QuantityToggle from '@/components/QuantityToggle.vue';
import isValidNumber from '@/helpers/isValidNumber';

export default {
  name: 'CartItem',
  filters: {
    numberFormat,
  },
  props: ['item'],
  components: { QuantityToggle },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProdAmount({
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(['updateCartProdAmount']),
    ...mapActions(['deleteCartProd']),
    // ...mapMutations({ deleteProduct: 'deleteCartProduct' }), // like mapGetters in CartPage this.$store.commit('deleteCartProduct', productId);
    updateProductAmount(newValue) {
      if (newValue >= 1) {
        this.amount = +newValue;
      } else this.amount = 1;
    },
    isValidNumber,
  },
};
</script>
