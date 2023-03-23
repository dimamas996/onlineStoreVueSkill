<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat}} ₽
            </span>

    <ul class="colors colors--black">
      <li v-for="colorItem in product.colorOptions" class="colors__item" :key="colorItem.id">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colorItem" v-model="color">
          <span class="colors__value" :style="{ backgroundColor: colorItem }"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  data() {
    return {
      color: null,
    };
  },
  filters: {
    numberFormat,
  },
  props: ['product'],
  created() {
    [this.color] = [this.product.colorOptions[0]];
  },
  methods: {
    goToPage,
  },
};
</script>

<style scoped>

</style>
