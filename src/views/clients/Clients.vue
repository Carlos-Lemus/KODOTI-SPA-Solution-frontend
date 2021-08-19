<template>
  <div class="p-6">
    <h1 class="title">Módulo de clientes</h1>
    <h2 class="subtitle">Desde aquí puede gestionar a los clientes.</h2>
    <nav class="fill has-text-right mb-3">
      <router-link to="/clients/create">Add new client</router-link>
    </nav>
    <Loading v-show="isLoading" />
    <div v-show="!isLoading" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th style="width: 50px"></th>
          <th style="width: 50px"></th>
        </thead>
        <tbody>
          <tr v-for="item in collection.items" :key="item.productId">
            <td>{{ item.clientId }}</td>
            <td>{{ item.name }}</td>
            <td class="has-text-warning has-text-centered">
              <router-link :to="`/clients/${item.clientId}/edit`">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </router-link>
            </td>
            <td class="has-text-danger has-text-centered">
              <a @click.prevent="() => remove(item.clientId)" href="#">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pager
      v-show="!isLoading"
      :pages="collection.pages"
      :page="collection.page"
      :paging="(p) => getAll(p)"
    />
  </div>
</template>


<script>
import Pager from "../../components/Pager.vue";
import Loading from "../../components/Loading.vue";

export default {
  name: "Products",
  components: {
    Pager,
    Loading,
  },
  mounted() {
    this.getAll(1);
  },
  data() {
    return {
      collection: {
        hasItems: false,
        items: [],
        page: 0,
        pages: 0,
        total: 0,
      },
      isLoading: false,
    };
  },
  methods: {
    getAll(page) {
      this.isLoading = true;

      this.$proxies.clientProxy
        .getAll(page, 10)
        .then((x) => {
          this.collection = x.data;
          this.isLoading = false;
        })
        .catch((e) => console.log(e));
        
    },
    remove(id) {
      this.$proxies.clientProxy.remove(id)
        .then(() => {
          
          this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: "Message",
              text: "Se elimino el cliente correctamente",
            });

          this.getAll(1);
        }).catch(exception => {
          console.log(exception)
          this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: "No se pudo eliminar el cliente",
            });
        });
    }
  },
};
</script>
