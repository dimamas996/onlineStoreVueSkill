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
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncProductCart(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
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
    loadOrderInfo(context, orderId) {
      const requestOptions = {
        method: 'GET',
        url: `${API_BASE_URL}/api/orders/${orderId}`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      };

      return axios(requestOptions)
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    addToCartProd(context, { productId, amount }) {
      const requestOptions = {
        method: 'POST',
        data: {
          productId,
          quantity: amount,
        },
        url: `${API_BASE_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      };

      return axios(requestOptions)
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncProductCart');
        });
    },
    loadCart(context) {
      const requestOptions = {
        method: 'GET',
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        url: `${API_BASE_URL}/api/baskets`,
      };

      return axios(requestOptions)
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
      context.commit('updateProductAmount', {
        productId,
        amount,
      });

      const requestOptions = {
        method: 'PUT',
        data: {
          productId,
          quantity: amount,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        url: `${API_BASE_URL}/api/baskets/products`,
      };

      return axios(requestOptions)
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
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
