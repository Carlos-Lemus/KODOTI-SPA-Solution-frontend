<template>
  <div class="p-6">
    <h1 class="title">Módulo de órdenes</h1>
    <h2 class="subtitle">Desde aquí puede gestionar sus órdenes.</h2>

    <Loading v-if="isLoading" />
    <template v-else>
      <div class="field has-text-right has-text-primary">
        <router-link to="/orders/create">Agregar nueva orden</router-link>
      </div>
      <div v-show="!isLoading" class="table-container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <th>Cliente</th>
            <th style="width: 200px" class="has-text-right">Iva</th>
            <th style="width: 200px" class="has-text-right">Sub Total</th>
            <th style="width: 200px" class="has-text-right">Total</th>
            <th style="width: 150px"></th>
          </thead>
          <tbody>
            <tr v-for="item in collection.items" :key="item.id">
              <td>{{ item.cliente.name }}</td>
              <td class="has-text-right">US$ {{ item.iva.toFixed(2) }}</td>
              <td class="has-text-right">US$ {{ item.subTotal.toFixed(2) }}</td>
              <td class="has-text-right">US$ {{ item.total.toFixed(2) }}</td>
              <td class="has-text-centered has-text-info">
                <router-link :to="`/orders/${item.orderId}/detail`"
                  >Ver detalle</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pager
        :paging="(p) => getAll(p)"
        :page="collection.page"
        :pages="collection.pages"
      />
    </template>
  </div>
</template>

<script>
import Loading from "../../components/Loading.vue";
import Pager from "../../components/Pager.vue";

export default {
  name: "Orders",
  components: {
    Loading,
    Pager,
  },
  mounted() {
    this.getAll(1);
  },
  data() {
    return {
      isLoading: false,
      collection: {
        hasItems: false,
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      },
    };
  },
  methods: {
    getAll(page) {
      this.isLoading = true;

      this.$proxies.orderProxy
        .getAll(page, 10)
        .then((x) => {
          this.collection = x.data;
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>