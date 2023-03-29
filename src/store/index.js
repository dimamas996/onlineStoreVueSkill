import Vuex from 'vuex';
import Vue from 'vue';
import products from '@/data/products';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1371,
      amount: 2,
    }, {
      productId: 506,
      amount: 1,
    }],
  },
  mutations: {
    addProductToCart(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((element) => element.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateProductAmount(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((element) => element.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({ ...item, ...products.find((p) => p.id === item.productId) }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.price * item.amount) + acc, 0);
    },
    positionsAmount(state) {
      return state.cartProducts.length;
    },
  },
});
