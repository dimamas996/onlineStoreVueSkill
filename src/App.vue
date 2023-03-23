<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
};
</script>

<!--
<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"></component>
</template>

import eventBus from '@/eventBus';
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = {
  main: MainPage,
  product: ProductPage,
};

  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  },
-->
