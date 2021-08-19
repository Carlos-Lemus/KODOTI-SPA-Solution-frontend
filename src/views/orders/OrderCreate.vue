<template>
  <div class="p-6">
    <h1 class="title">Creación de orden</h1>
    <h2 class="subtitle">Desde aquí podrá crear una nueva orden de compra.</h2>

    <Loading v-if="isLoading" />
    <template v-else>
      <div class="box">
        <div class="select is-fullwidth">
          <select v-model.number="model.clientId">
            <option
              v-for="client in clients"
              :key="client.clientId"
              :value="client.clientId"
            >
              {{ client.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="box">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th colspan="2">Producto</th>
              <th class="has-text-right" style="width: 150px">Cantidad</th>
              <th class="has-text-right" style="width: 150px">P.U</th>
              <th class="has-text-right" style="width: 150px">IVA</th>
              <th class="has-text-right" style="width: 150px">Sub Total</th>
              <th class="has-text-right" style="width: 150px">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">
                <div class="select is-fullwidth">
                  <select
                    @change="onChangeProductSelection"
                    v-model.number="product.productId"
                  >
                    <option
                      v-for="product in products"
                      :key="product.productId"
                      :value="product.productId"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </div>
              </td>
              <td>
                <input
                  class="input"
                  type="number"
                  v-model.number="product.quantity"
                />
              </td>
              <td>
                <input
                  class="input"
                  type="number"
                  v-model.number="product.unitPrice"
                />
              </td>
              <td class="has-text-right" colspan="3">
                <button @click="addProduct" class="button">Agregar</button>
              </td>
            </tr>

            <tr v-if="model.items.length === 0">
              <td class="has-text-centered is-size-5" colspan="7">
                No se ha seleccionado un producto
              </td>
            </tr>
            <tr v-else v-for="item in model.items" :key="item.productId">
              <td class="has-text-centered" style="width: 100px">
                <a
                  class="has-text-danger"
                  @click="removeProduct(item.productId)"
                  >Retirar</a
                >
              </td>
              <td>{{ item.name }}</td>
              <td class="has-text-right">{{ item.quantity }}</td>
              <td class="has-text-right">US$ {{ item.unitPrice }}</td>
              <td class="has-text-right">US$ {{ item.iva }}</td>
              <td class="has-text-right">US$ {{ item.subTotal }}</td>
              <td class="has-text-right">US$ {{ item.total }}</td>
            </tr>
          </tbody>
          <tfoot class="has-text-weight-bold">
            <tr>
              <td colspan="6" class="has-text-right">IVA</td>
              <td class="has-text-right">US$ {{ iva }}</td>
            </tr>
            <tr>
              <td colspan="6" class="has-text-right">Sub Total</td>
              <td class="has-text-right">US$ {{ subTotal }}</td>
            </tr>
            <tr>
              <td colspan="6" class="has-text-right">Total</td>
              <td class="has-text-right">US$ {{ total }}</td>
            </tr>
          </tfoot>
        </table>
        <button
          @click="create"
          :disabled="model.items.length === 0"
          class="button is-primary is-medium is-fullwidth"
        >
          Crear orden
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import Loading from "../../components/Loading.vue";

export default {
  name: "OrderCreate",
  components: {
    Loading,
  },
  mounted() {
    this.initialize();
  },
  computed: {
    iva() {
      if (this.model.items.length === 1) return this.model.items[0].iva;

      if (this.model.items.length > 1)
        return this.model.items.reduce((a, b) => a.iva + b.iva);

      return 0;
    },
    subTotal() {
      if (this.model.items.length === 1) return this.model.items[0].subTotal;

      if (this.model.items.length > 1)
        return this.model.items.reduce((a, b) => a.subTotal + b.subTotal);

      return 0;
    },
    total() {
      if (this.model.items.length === 1) return this.model.items[0].total;

      if (this.model.items.length > 1)
        return this.model.items.reduce((a, b) => a.total + b.total);

      return 0;
    },
  },
  data() {
    return {
      isLoading: false,
      clients: [],
      products: [],
      model: {
        clientId: null,
        items: [],
      },
      product: {
        productId: null,
        quantity: 1,
        unitPrice: 0,
      },
    };
  },
  methods: {
    initialize() {
      this.isLoading = true;

      const clients = this.$proxies.clientProxy.getAll(1, 100);
      const products = this.$proxies.productProxy.getAll(1, 100);

      Promise.all([clients, products]).then((values) => {
        this.clients = values[0].data.items;
        this.products = values[1].data.items;

        this.model.clientId = this.clients[0].clientId;
        this.product.productId = this.products[0].productId;

        this.onChangeProductSelection();

        this.isLoading = false;
      });
    },
    onChangeProductSelection() {
      const product = this.products.find(
        (x) => x.productId == this.product.productId
      );

      this.product.quantity = 1;
      this.product.unitPrice = product.price;
    },
    addProduct() {
      if (
        !this.model.items.some((x) => x.productId === this.product.productId)
      ) {
        // Debería venir del servidor
        const ivaRate = 0.18;

        const item = {
          // Server
          productId: this.product.productId,
          unitPrice: this.product.unitPrice,
          quantity: this.product.quantity,
          name: this.products.find(
            (x) => x.productId === this.product.productId
          ).name,
          total: this.product.unitPrice * this.product.quantity,
        };

        item.subTotal = Math.round((item.total / (1 + ivaRate)) * 100) / 100;
        item.iva = Math.round((item.total - item.subTotal) * 100) / 100;

        this.model.items.push(item);
        this.onChangeProductSelection();
      }
    },
    removeProduct(id) {
      this.model.items = this.model.items.filter((x) => x.productId != id);
    },
    create() {
      this.isLoading = true;

      this.$proxies.orderProxy
        .create(this.model)
        .then(() => {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Message",
            text: "La orden ha sido creada",
          });

        })
        .catch(exception => {
          console.log(exception);
          
            this.$swal({
                toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: "Ocurrio un error inesperado",
            });
        })
        .finally(() => {
            this.isLoading = false;
            this.$router.push("/orders");
        });
    },
  },
};
</script>