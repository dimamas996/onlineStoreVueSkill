import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncProductCart(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({ productId: item.product.id, amount: item.quantity }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          ...product,
          image: product.image.file.url,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.price * item.amount) + acc, 0);
    },
    positionsAmount(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    addToCartProd(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncProductCart');
      });
    },
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncProductCart');
        });
    },
    updateCartProdAmount(context, { productId, amount }) {
      context.commit('updateProductAmount', { productId, amount });
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      }).then((response) => {
        context.commit('updateCartProductsData', response.data.items);
      }).catch(() => {
        context.commit('syncProductCart');
      });
    },
    deleteCartProd(context, { productId }) {
      context.commit('deleteCartProduct', productId);

      const requestOptions = {
        method: 'DELETE',
        data: {
          productId,
        },
        url: `${API_BASE_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      };
      return axios(requestOptions);
    },
  },
});
