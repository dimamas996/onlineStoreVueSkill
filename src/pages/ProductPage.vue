<template>
  <LoaderComponent v-if="productLoading"/>
  <div v-else-if="productLoadingFailed">Error
    <button @click.prevent="loadProduct">Try again</button>
  </div>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">{{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>
            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li v-for="color in product.colors" :key="color.index" class="colors__item">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" value="blue"
                           checked="">
                    <span class="colors__value" :style="{'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                           checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <QuantityToggle
                :product-amount="productAmount"
                @changer="updateProductAmount"
              />
              <button class="button button--primery" @click.prevent="addToCart" :disabled="productSending" type="submit">
                В корзину
              </button>
              <div v-show="productAdded"> The item added to the cart</div>
              <div v-show="productSending">Add item to the cart</div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Беспроводная связь</h3>
          <p>Wi-Fi, Bluetooth 4.0, ANT+</p>

          <h3>Поддерживаемые спутники</h3>
          <p>GPS, ГЛОНАСС, BEIDOU Galileo и QZSS</p>

          <h3>Аккумулятор</h3>
          <p>перезаряжаемый USB</p>

          <h3>Время автономной работы</h3>
          <p>до 15 часов</p>

          <h3>Тип аккумулятора</h3>
          <p>литий-ионный</p>

          <h3>Водонепроницаемость</h3>
          <p>IPX7</p>

          <h3>Фирменное приложение</h3>
          <p>ELEMNT от Wahoo Fitness</p>

          <h3>Совместимость</h3>
          <p>iOS 9.0 и последующие, Android 4.3 и старше</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import QuantityToggle from '@/components/QuantityToggle.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';

export default {
  props: ['pageParams'],
  components: { QuantityToggle, LoaderComponent },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productSending: false,
    };
  },
  computed: {
    product() {
      return this.productData;
    },
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addToCartProd']),
    addToCart() {
      this.productAdded = false;
      this.productSending = true;
      this.addToCartProd({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true;
        this.productSending = false;
      });
    },
    updateProductAmount(newValue) {
      if (newValue >= 1) {
        this.productAmount = +newValue;
      } else {
        this.productAmount = 1;
      }
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => {
          this.productLoadingFailed = true;
        })
        .finally(() => {
          this.productLoading = false;
        });
    },
  },
  created() {
    this.loadProduct();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.productAdded = false;
        this.productSending = false;
        this.loadProduct();
      },
      immediate: true,
    },
  },
};

</script>
