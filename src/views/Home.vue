<template>
  <div class="home">
    <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Kodoti App</h1>
          <h2 class="subtitle">Bienvenido  <span class='has-text-weight-bold'>{{this.$store.getters.user.name}}</span> a tu App de gestion de ventas</h2>

          <p>Desde esta app podras gestionar las ventas en tu negocio</p>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
};
</script>
