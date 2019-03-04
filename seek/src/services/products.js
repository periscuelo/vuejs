import Axios from '@/services/axios';

export default {
  getProducts() {
    return Axios().get('/products');
  },
  getDiscounts(id) {
    return Axios().get(`/products/discounts/${id}`);
  },
};
