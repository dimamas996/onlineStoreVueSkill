import Vue from 'vue';
import VueRouter from 'vue-router';
import mainPage from '@/pages/MainPage.vue';
import productPage from '@/pages/ProductPage.vue';
import cartPage from '@/pages/CartPage.vue';
import notFoundPage from '@/pages/NotFoundPage.vue';
import orderPage from '@/pages/OrderPage.vue';
import orderInfoPage from '@/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: mainPage,
    path: '/',
  },
  {
    name: 'product',
    component: productPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: cartPage,
    path: '/cart',
  },
  {
    name: 'order',
    component: orderPage,
    path: '/order',
  },
  {
    name: 'orderInfo',
    component: orderInfoPage,
    path: '/order/:id',
  },
  {
    name: 'notFoundPage',
    component: notFoundPage,
    path: '*',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
