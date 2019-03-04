<template>
  <div class="vue-container">
    <b-form-select
      v-model="mSelect"
      :options="options"
      size="sm"
      class="mt-3"
      @change="$emit(event, mSelect, data)"
    >
      <template slot="first">
        <option :value="null">
          -- Please, select a {{ title }} --
        </option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    data: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      default: 'change',
    },
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: 'record',
    },
  },
  data: () => ({
    mSelect: null,
  }),
  watch: {
    selected(value) {
      this.mSelect = value;
    },
  },
};
</script>
