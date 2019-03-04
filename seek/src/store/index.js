import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import Customers from './modules/customers';
import Products from './modules/products';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    Customers,
    Products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
