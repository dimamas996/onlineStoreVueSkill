<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form action="#" class="filter__form form" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="form__label form__label--price">
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <input v-model.number="currentPriceFrom" class="form__input" name="min-price" type="text">
          <span class="form__value">От</span>
        </label>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="form__label form__label--price">
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <input v-model.number="currentPriceTo" class="form__input" name="max-price" type="text">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="form__label form__label--select">
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <select v-model.number="currentCategoryId" class="form__select"
                  name="category">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#73B6EA']">
              <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#FFBE15']">
              <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#939393']">
              <span class="colors__value" style="background-color: #939393;">
                </span></label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#8BE000']">
              <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#FF6B00']">
              <span class="colors__value" style="background-color: #FF6B00;">
                </span></label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#FFF']">
              <span class="colors__value" style="background-color: #FFF;">
                </span></label>
          </li>
          <li class="colors__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="colors__label">
              <input class="colors__radio sr-only flag-color"
                     name="color"
                     type="checkbox" v-model="currentColor['#000']">
              <span class="colors__value" style="background-color: #000;">
                </span></label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input checked="" class="check-list__check sr-only" name="volume" type="checkbox"
                     value="8">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox" value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox"
                     value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" name="volume" type="checkbox"
                     value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import categories from '@/data/categories';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: {
        '#73B6EA': false,
        '#FFBE15': false,
        '#939393': false,
        '#8BE000': false,
        '#FF6B00': false,
        '#FFF': false,
        '#000': false,
      },
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colors'],
  computed: {
    categories() {
      return categories;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colors(value) {
      this.currentColor = JSON.parse(JSON.stringify(value)); // try to rewrite object
    },
  },
  model: {
    prop: 'page',
    event: 'pageReset',
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colors', this.currentColor);
      this.$emit('pageReset', 1);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colors', {
        '#73B6EA': false,
        '#FFBE15': false,
        '#939393': false,
        '#8BE000': false,
        '#FF6B00': false,
        '#FFF': false,
        '#000': false,
      });
      this.$emit('pageReset', 1);
    },
  },
};
</script>
