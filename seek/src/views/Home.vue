<template>
  <div class="vue-container">
    <b-container>
      <b-row>
        <b-col>
          <MySelect
            :selected="customer"
            :options="optsCustomer"
            data="customer"
            title="customer"
            @change="setVals"
          />
        </b-col>
      </b-row>
      <b-row v-if="customer">
        <b-col cols="8">
          <MySelect
            :selected="product"
            :options="optsProduct"
            data="product"
            title="product"
            @change="setVals"
          />
        </b-col>
        <b-col cols="2">
          <b-form-input
            v-model="quantity"
            type="number"
            min="0"
            size="sm"
            class="mt-3"
          />
        </b-col>
        <b-col cols="2">
          <b-button
            :disabled="addDisabled"
            variant="outline-success"
            size="sm"
            class="mt-3"
            @click="add"
          >
            Add to Cart
          </b-button>
        </b-col>
      </b-row>
      <b-row
        v-if="items.length > 0"
        class="mt-5"
      >
        <b-col>
          <b-table
            :fields="fields"
            :items="items"
          >
            <template
              slot="id"
              slot-scope="data"
            >
              <b-button
                variant="outline-danger"
                size="sm"
                @click="remove(data.index)"
              >
                X
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row v-if="items.length > 0">
        <b-col
          cols="10"
          class="text-right"
        >
          Total:
        </b-col>
        <b-col cols="2">
          $ {{ total.toString().replace('.', ',') }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MySelect from '@/components/MySelect.vue';
import CustomerService from '@/services/customers';
import ProductService from '@/services/products';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    MySelect,
  },
  data: () => ({
    customer: null,
    product: null,
    quantity: 0,
    total: 0,
    addDisabled: true,
    fields: [
      {
        key: 'name',
        label: 'Product',
      },
      {
        key: 'price',
        formatter: value => `$ ${value.toString().replace('.', ',')}`,
      },
      'qty',
      {
        key: 'subtotal',
        formatter: value => `$ ${value.toString().replace('.', ',')}`,
      },
      {
        key: 'id',
        label: '',
      },
    ],
    items: [],
  }),
  computed: {
    ...mapGetters('Customers', ['discCustomers', 'optsCustomer']),
    ...mapGetters('Products', ['discProducts', 'optsProduct', 'products']),
  },
  watch: {
    customer(value) {
      if (value !== null) {
        this.getCustomersDiscounts();
      } else {
        this.setCustomerDiscount([]);
      }
      this.product = null;
      this.quantity = 0;
      this.total = 0;
      this.items = [];
    },
    product(value) {
      if (value !== null) {
        this.getProductsDiscounts();
        if (this.quantity > 0) this.addDisabled = false;
      } else {
        this.addDisabled = true;
        this.setProductDiscount([]);
      }
    },
    quantity(value) {
      this.addDisabled = (this.product === null || value < 1);
    },
  },
  mounted() {
    this.getCustomers();
    this.getProducts();
  },
  methods: {
    ...mapActions('Customers', ['setCustomerData', 'setCustomerDiscount']),
    ...mapActions('Products', ['setProductData', 'setProductDiscount']),
    add() {
      const [item] = this.products.filter(value => (this.product === value.id));
      const itemIndex = this.items.findIndex(item => this.product === item.id);
      const itemQty = parseInt(this.quantity, 10);
      const itemSubtotal = (item.price * itemQty);

      if (itemIndex >= 0) {
        this.items[itemIndex].qty += itemQty;
        this.items[itemIndex].subtotal += itemSubtotal;
      } else {
        item.qty = itemQty;
        item.subtotal = itemSubtotal;
        this.items.push(item);
      }

      this.total += itemSubtotal;
      this.product = null;
      this.quantity = 0;
    },
    async getCustomers() {
      try {
        const response = await CustomerService.getCustomers();
        this.setCustomerData(response.data.body);
      } catch (error) {
        console.log('Não foi possível carregar os dados da API!', error);
      }
    },
    async getCustomersDiscounts() {
      try {
        const response = await CustomerService.getDiscounts(this.customer);
        this.setCustomerDiscount(response.data.body);
      } catch (error) {
        console.log('Não foi possível carregar os dados da API!', error);
      }
    },
    async getProducts() {
      try {
        const response = await ProductService.getProducts();
        this.setProductData(response.data.body);
      } catch (error) {
        console.log('Não foi possível carregar os dados da API!', error);
      }
    },
    async getProductsDiscounts() {
      try {
        const response = await ProductService.getDiscounts(this.product);
        this.setProductDiscount(response.data.body);
      } catch (error) {
        console.log('Não foi possível carregar os dados da API!', error);
      }
    },
    remove(index) {
      this.total -= this.items[index].subtotal;
      this.items.splice(index, 1);
    },
    setVals(id, item) {
      this[item] = id;
    },
  },
};
</script>
