import Vue from 'vue';
import VueRouter from 'vue-router';
import mainPage from '@/pages/MainPage.vue';
import productPage from '@/pages/ProductPage.vue';
import cartPage from '@/pages/CartPage.vue';
import notFoundPage from '@/pages/NotFoundPage.vue';

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
    name: 'notFoundPage',
    component: notFoundPage,
    path: '*',
  },
];

const router = new VueRouter({ routes });

export default router;
