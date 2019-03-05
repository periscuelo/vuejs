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
            @change="setDataVals"
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
            @change="setDataVals"
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
            @click="addToCart"
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
                @click="removeOfCart(data.index)"
              >
                X
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row v-if="discounts > 0">
        <b-col
          cols="10"
          class="text-right"
        >
          Discounts:
        </b-col>
        <b-col cols="2">
          $ {{ discounts.toFixed(2).toString().replace('.', ',') }}
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
          $ {{ total.toFixed(2).toString().replace('.', ',') }}
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
    newQuantity: 0,
    total: 0,
    discounts: 0,
    discountsPrice: 0,
    addDisabled: true,
    fields: [
      {
        key: 'name',
        label: 'Product',
      },
      {
        key: 'price',
        formatter: value => `$ ${value.toFixed(2).toString().replace('.', ',')}`,
      },
      'qty',
      {
        key: 'subtotal',
        formatter: value => `$ ${value.toFixed(2).toString().replace('.', ',')}`,
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
      this.newQuantity = 0;
      this.total = 0;
      this.discounts = 0;
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
    addToCart() {
      this.quantity = parseInt(this.quantity, 10);
      this.newQuantity = this.quantity;
      const mProducts = JSON.parse(JSON.stringify(this.products)); // removing the reactivity
      const [item] = mProducts.filter(value => (this.product === value.id));
      const itemIndex = this.items.findIndex(value => (this.product === value.id));

      // eslint-disable-next-line
      const [discFounds] = this.discProducts.filter(discounts => {
        return this.discCustomers.find(value => (value === discounts.id));
      });

      // Have a discount
      if (discFounds !== undefined) {
        // for for deal
        if (discFounds.amount && discFounds.decrease) {
          if (itemIndex >= 0) {
            const myQty = (this.items[itemIndex].qty + this.newQuantity);
            if (myQty < discFounds.amount) {
              this.newQuantity = myQty;
            } else {
              this.newQuantity = (
                myQty - (Math.floor(myQty / discFounds.amount) * discFounds.decrease)
              );
            }
            this.items[itemIndex].subtotal = 0;
          } else if (this.quantity >= discFounds.amount) {
            this.newQuantity -= (
              Math.floor(this.quantity / discFounds.amount) * discFounds.decrease
            );
          }
        // new price per amount
        } else if (discFounds.amount && discFounds.new_price) {
          if (itemIndex >= 0) {
            const myQty = (this.items[itemIndex].qty + this.newQuantity);
            if (myQty >= discFounds.amount) {
              this.discountsPrice = (item.price - discFounds.new_price);
              item.price = discFounds.new_price;
              this.items[itemIndex].price = item.price;
              this.items[itemIndex].subtotal = (item.price * this.items[itemIndex].qty);
            }
          } else if (this.newQuantity >= discFounds.amount) {
            this.discountsPrice = (item.price - discFounds.new_price);
            item.price = discFounds.new_price;
          }
        // new price
        } else {
          item.price = discFounds.new_price;
        }
      }

      const itemSubtotal = (item.price * this.newQuantity);

      if (itemIndex >= 0) {
        this.items[itemIndex].qty += this.quantity;
        this.items[itemIndex].subtotal += itemSubtotal;
        this.items[itemIndex].discount = (
          Math.abs(this.items[itemIndex].subtotal
                   - (this.items[itemIndex].qty * this.items[itemIndex].price))
        );
      } else {
        item.qty = this.quantity;
        item.subtotal = itemSubtotal;
        item.discount = Math.abs(item.subtotal - (item.qty * item.price));
        this.items.push(item);
      }

      this.total = this.items.reduce((prev, curr) => (prev + curr.subtotal), 0);
      this.discounts = (
        this.items.reduce((prev, curr) => (prev + curr.discount), 0) + this.discountsPrice
      );
      this.product = null;
      this.quantity = 0;
      this.newQuantity = 0;
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
    removeOfCart(index) {
      this.total -= this.items[index].subtotal;
      this.discountsPrice = (this.items[index].discount === 0) ? 0 : this.discountsPrice;
      this.items.splice(index, 1);
      this.discounts = (
        this.items.reduce((prev, curr) => (prev + curr.discount), 0) + this.discountsPrice
      );
    },
    setDataVals(id, item) {
      this[item] = id;
    },
  },
};
</script>
