<template>
  <BaseFormField :title="title" :error="error">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input class="form__input" v-model="dateValue" :type="type" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFiledMixin from '@/mixins/formFiledMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFiledMixin],
};
</script>
