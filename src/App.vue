<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->

  <section class="hero is-light is-fullheight">
    <template v-if="hasConfig">
      <!-- Hero head: will stick at the top -->

      <Header v-if='this.$store.getters.statusAccess' />
      <div v-else class="hero-head"></div>

      <router-view />


      <!-- Hero footer: will stick at the bottom -->
      <Footer v-if='this.$store.getters.statusAccess' />
      <div v-else class="hero-foot"></div>

    </template>

    <div class="hero-body" v-else>
      <div class="container has-text-centered is-size-5">
        <p>Estamos inicializando el proyecto espere por favor</p>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  data() {
    return {
      hasConfig: false,
    };
  },
  mounted() {
    this.initialize();
    
    if (!this.$store.getters.statusAccess) {
      this.$router.push("/signup");
    }
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    initialize() {
      fetch("/config/version")
        .then((response) => response.text())
        .then((response) => {
          if (
            !localStorage.getItem("version") ||
            localStorage.getItem("version") !== response
          ) {
            localStorage.clear();
            localStorage.setItem("version", response);
          }
        });

      this.__prepareConfig();
      this.__isLoggedIn();
    },
    __prepareConfig() {
      if (!localStorage.getItem("config")) {
        fetch("/config")
          .then((response) => response.json())
          .then((response) => {
            localStorage.setItem("config", JSON.stringify(response));
            this.hasConfig = true;
            this.$router.go();
          });
      } else {
        this.hasConfig = true;
      }
    },
    __isLoggedIn() {
      if (localStorage.getItem("access_token")) {
        // const token = localStorage.getItem("access_token").split(".");
        // const payload = JSON.parse(
        //   decodeURIComponent(
        //     atob(token[1])
        //       .split("")
        //       .map(function (c) {
        //         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        //       })
        //       .join("")
        //   )
        // );

        // // console.log(payload);

        // this.$store.dispatch('setUserAction', {
        //   id: payload.nameid,
        //   name: payload.email.split('@')[0],
        //   email: payload.email,
        //   roles: payload.role
        // });

        this.$user.initializate();
        this.$store.dispatch('loginSignAction');
      }
    },
  },
};
</script>

<style>
@import url("./styles/main.css"); 
</style>
