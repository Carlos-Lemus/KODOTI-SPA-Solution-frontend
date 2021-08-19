<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="has-text-centered">
        <img src="../assets/logo.png" />
        <hr />
      </div>
      <div class="box">
        <div class="tabs is-boxed">
          <ul>
            <li :class="{ 'is-active': tab === 'login' }">
              <a @click="tab = 'login'">Login</a>
            </li>
            <li :class="{ 'is-active': tab === 'register' }">
              <a @click="tab = 'register'">Registro</a>
            </li>
          </ul>
        </div>

        <form @submit.prevent="authenticate" v-if="tab === 'login'">
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.email"
              required
              class="input"
              type="email"
              placeholder="Ingrese su e-mail"
            />
          </div>
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.password"
              required
              class="input"
              type="password"
              placeholder="Ingrese su password"
            />
          </div>
          <div class="field">
            <button
              :disabled="login.loading"
              type="submit"
              class="button is-info"
            >
              Ingresar
            </button>
          </div>
        </form>

        <form @submit.prevent="addNewUser" v-if="tab === 'register'">
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.email"
              required
              autocomplete="none"
              class="input"
              type="email"
              placeholder="Ingrese su e-mail"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.firstName"
              required
              autocomplete="none"
              class="input"
              type="text"
              placeholder="Su nombre"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.lastName"
              required
              autocomplete="none"
              class="input"
              type="text"
              placeholder="Su apellido"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.password"
              required
              autocomplete="none"
              class="input"
              type="password"
              placeholder="Ingrese su password"
            />
          </div>
          <div class="field">
            <button
              :disabled="register.loading"
              type="submit"
              class="button is-info"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginAndRegister",
  data() {
    return {
      tab: "login",
      login: {
        email: "admin2@gmail.com",
        password: "123456",
        loading: false,
      },
      register: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        loading: false,
      },
    };
  },
  methods: {
    addNewUser() {

      this.register.loading = true;

      this.$proxies.identityProxy
        .register(this.register)
        .then((x) => {

          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Message",
            text: "Se registro el usuario",
          });
        })
        .catch((error) => {

          if (error.response.status === 400) {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: error.response.data,
            });
          }
        })
        .finally(() => {
          this.register.loading = false;
        });
    },

    authenticate() {

      this.login.loading = true;

      this.$proxies.identityProxy
        .login(this.login)
        .then(response => {

          const token = response.data;

          localStorage.setItem("access_token", token);
          this.$user.initializate();
          this.$store.dispatch('loginSignAction');

          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Message",
            text: "Tu acceso ha sido validado correctamente",
          });

          this.$router.push('/');
        })
        .catch(exception => {
          console.log(exception)
          this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: "El correo o contraseña son incorrectos"
            });
        })
        .finally(() => {
          this.login.loading = false;
        })
    }
    
  },
};
</script>