<template>
  <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <img src="../assets/logo.png" alt="Logo" />
          </router-link>
          <span
            @click="activeMenu"
            class="navbar-burger"
            :class="{ 'is-active': isActiveMenu }"
            data-target="navbarMenuHeroC"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div
          id="navbarMenuHeroC"
          class="navbar-menu"
          :class="{ 'is-active': isActiveMenu }"
        >
          <div class="navbar-end">
            <!-- <a class="navbar-item"> {{ this.$store.getters.user.email }} </a> -->
            <router-link class="navbar-item" :class="{'is-active': this.$route.path === '/'}" to="/">Home</router-link>
            <router-link class="navbar-item" :class="{'is-active': this.$route.path.startsWith('/clients')}" to="/clients">Clients</router-link>
            <router-link class="navbar-item" :class="{'is-active': this.$route.path.startsWith('/products')}" to="/products">Products</router-link>
            <router-link class="navbar-item" :class="{'is-active': this.$route.path.startsWith('/orders')}" to="/orders">Orders</router-link>
            <router-link class="navbar-item" :class="{'is-active': this.$route.path.startsWith('/users')}" to="/users">Users</router-link>
            <span class="navbar-item">
              <button @click="signOut" class="button is-danger is-inverted">
                <span>
                  <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                  Cerrar sesion
                </span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActiveMenu: false,
    };
  },
  methods: {
    activeMenu() {
      this.isActiveMenu = !this.isActiveMenu;
    },
    signOut() {
      localStorage.removeItem("access_token");
      this.$store.dispatch("loginOutAction");
      this.$router.go();
    },
  },
};
</script>