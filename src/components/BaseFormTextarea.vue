<template>
  <BaseFormField :title="title" :error="error">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <textarea class="form__input form__input--area" v-model="dateValue"
              :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
import formFiledMixin from '@/mixins/formFiledMixin';

export default {
  mixins: [formFiledMixin],
};
</script>
