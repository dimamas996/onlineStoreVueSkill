<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ posAm }} {{ editedWord }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="makeOrder" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
                          placeholder="Введите ваше полное имя"/>
            <BaseFormText v-model="formData.address" title="Адрес доставки"
                          :error="formError.address" placeholder="Введите ваш адрес"/>
            <BaseFormText v-model="formData.phone" type="tel" title="Телефон"
                          :error="formError.phone" placeholder="Введите ваш телефон"/>
            <BaseFormText v-model="formData.email" type="email" title="Email"
                          :error="formError.email" placeholder="Введи ваш Email"/>
            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу"
                              :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label class="options__label">
                  <input class="options__radio sr-only" checked type="radio" name="delivery"
                         :value="deliveryPrice">
                  <span class="options__value">
                    Курьером <b>{{ deliveryPrice }} ₽</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <abbr :title="temporaryMessage">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="options__label unavalible">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0">
                    <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                  </label>
                </abbr>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label class="options__label">
                  <input class="options__radio sr-only" checked type="radio" name="pay"
                         value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <abbr :title="temporaryMessage">
                  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                  <label class="options__label unavalible">
                    <input class="options__radio sr-only" disabled type="radio" name="pay"
                           value="cash">
                    <span class="options__value">
                    Наличными при получении
                  </span>
                  </label>
                </abbr>
              </li>
            </ul>
          </div>
        </div>
        <CompleteOrderList :products="products" :delivery-price="deliveryPrice"
                           :total-price="totalPrice">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </CompleteOrderList>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ this.formErrorMessage }}
          </p>
        </div>
        <div v-if="formSending">
          <h4>Ваша заказ отправляется...</h4>
          <p>
            <img alt="Пожалуйста, ожидайте..." src="../assets/Iphone-spinner-2.gif">
          </p>
        </div>
        <div v-if="formSent">
          <h4>Заказ отправлен!</h4>
          <p>
            Спасибо, что выбрали нас!
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import CompleteOrderList from '@/components/CompleteOrderList.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import endingEdit from '@/helpers/endingEdit';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextarea,
    CompleteOrderList,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formSending: false,
      formSent: false,
      deliveryPrice: 500,
      temporaryMessage: 'Временно недоступно',
    };
  },
  computed: {
    ...mapGetters({
      posAm: 'positionsAmount',
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
    editedWord: {
      get() {
        return this.endingEdit(this.posAm);
      },
    },
  },
  methods: {
    makeOrder() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formSending = true;
      this.formSent = false;

      const requestOptions = {
        method: 'POST',
        data: {
          ...this.formData,
        },
        url: `${API_BASE_URL}/api/orders`,
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      };

      return axios(requestOptions)
        .then((response) => {
          this.$store.commit('resetCart');
          this.formData = {};
          this.formSent = true;
          this.formSending = false;
          this.$store.commit('updateOrderInfo', response.data);
          setTimeout(() => {
            this.$router.push({
              name: 'orderInfo',
              params: { id: response.data.id },
            });
          }, 300);
        })
        .catch((error) => {
          this.formSending = false;
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message || '';
        });
    },
    endingEdit,
  },
};
</script>

<style>
.unavalible {
  cursor: not-allowed;
}

.unavalible:hover {
  background-color: rgba(255, 64, 54, 0.39);
}
</style>
