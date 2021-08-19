<template>
  <div class="p-6">
    <h1 class="title">Módulo de usuarios</h1>
    <h2 class="subtitle">Desde aquí puede gestionar sus usuarios.</h2>

    <Loading v-show='isLoading' />
    <div v-show='!isLoading' class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <th>Nombre</th>
          <th>E-mail</th>
          <th style="width: 100px">Admin</th>
          <th style="width: 100px">Seller</th>
        </thead>
        <tbody>
          <tr v-for='item in collection.items' :key='item.id'>
            <td>{{item.fullName.split('@')[0]}}</td>
            <td>{{item.email}}</td>
            <td class='has-text-centered'>
              <font-awesome-icon class='has-text-primary' v-if='item.roles.includes("Admin")' :icon="['fas', 'check']" />
              <font-awesome-icon class='has-text-danger' v-else :icon="['fas', 'times']" />
              <span class="icon">
                <i class="fa fa-times"></i>
              </span>
            </td>
            <td class='has-text-centered'>
              <font-awesome-icon class='has-text-primary' v-if='item.roles.includes("Seller")' :icon="['fas', 'check']" />
              <font-awesome-icon class='has-text-danger' v-else :icon="['fas', 'times']" />
              <span class="icon">
                <i class="fa fa-times"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pager v-show='!isLoading' :pages='collection.pages' :page='collection.page' :paging='p => getAll(p)' />

  </div>
</template>

<script>

import Pager from '../components/Pager.vue';
import Loading from '../components/Loading.vue';


export default {
  name: "Users",
  components: {
    Pager,
    Loading
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
        total: 0
      },
      isLoading: false
    }
  },
  methods: {
    getAll(page) {
      this.isLoading = true;
      
      this.$proxies.userProxy.getAll(page, 10)
      .then(x => {
        this.collection = x.data;
        this.isLoading = false;
      })
      .catch(e => console.log(e));
    }
  }
};
</script>
