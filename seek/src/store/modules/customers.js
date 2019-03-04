import { CHANGE_CUSTOMER_DATA, CHANGE_DISCOUNT_DATA } from '../mutations-types';

const actions = {
  setCustomerData({ commit }, data) {
    commit(CHANGE_CUSTOMER_DATA, data);
  },
  setCustomerDiscount({ commit }, data) {
    commit(CHANGE_DISCOUNT_DATA, data);
  },
};

const mutations = {
  [CHANGE_CUSTOMER_DATA](state, value) {
    state.customers = value;
  },
  [CHANGE_DISCOUNT_DATA](state, value) {
    state.discounts = value;
  },
};

const getters = {
  optsCustomer: state => state.customers.map(customer => ({
    value: customer.id,
    text: customer.name,
  })),
  discCustomers: state => state.discounts,
};

const state = {
  customers: [],
  discounts: [],
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
