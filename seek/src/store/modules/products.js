import { CHANGE_PRODUCT_DATA, CHANGE_DISCOUNT_DATA } from '../mutations-types';

const actions = {
  setProductData({ commit }, data) {
    commit(CHANGE_PRODUCT_DATA, data);
  },
  setProductDiscount({ commit }, data) {
    commit(CHANGE_DISCOUNT_DATA, data);
  },
};

const mutations = {
  [CHANGE_PRODUCT_DATA](state, value) {
    state.products = value;
  },
  [CHANGE_DISCOUNT_DATA](state, value) {
    state.discounts = value;
  },
};

const getters = {
  discProducts: state => state.discounts,
  optsProduct: state => state.products.map(product => ({
    value: product.id,
    text: product.name,
  })),
  products: state => state.products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
  })),
};

const state = {
  products: [],
  discounts: [],
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
