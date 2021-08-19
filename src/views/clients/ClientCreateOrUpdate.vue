<template>
  <div class="p-6">
    <h1 class="title">{{ model.clientId ? model.name : "Nuevo cliente" }}</h1>

    <!-- <Loader ading" /> -->
    <Form
      v-if="!isLoading"
      @submit="save"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <div class="field">
        <Field
          v-model="model.name"
          class="input"
          :class="{ 'is-danger': errors.name }"
          type="text"
          name="name"
          placeholder="Ingrese el nombre"
          autocomplete="none"
        />
        <p class="help is-danger">{{ errors.name }}</p>
      </div>
      <div class="field">
        <button type="submit" class="button is-info">Guardar</button>
      </div>
    </Form>

    <Loading v-else />
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import * as Yup from "yup";

import Loading from "../../components/Loading.vue";

let self;

export default {
  name: "ProductCreateOrUpdate",
  components: {
    Form,
    Field,
    Loading,
  },
  mounted() {
    this.get();
  },
  created() {
    self = this;
  },
  setup() {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required("El nombre es requerido")
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    });

    const save = (values) => {
      self.isLoading = true;

      if (!self.$route.params.id) {
        // display form values on success
      self.$proxies.clientProxy
        .create(values)
        .then((x) => {
          self.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Message",
            text: "Se agrego el nuevo cliente",
          });
        })
        .catch((error) => {
          console.log(error);
          self.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Error :(",
            text: "No se pudo crear el cliente",
          });
        })
        .finally(() => {
          self.isLoading = false;
          self.$router.push('/clients');
        });
      } else {
        // display form values on success
        self.$proxies.clientProxy
          .update(self.model.clientId, values)
          .then((x) => {
            self.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: "Message",
              text: "Se actualizo el cliente correctamente",
            });
          })
          .catch((error) => {
            console.log(error);
            self.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: "No se pudo actualizar el cliente",
            });
          })
          .finally(() => {
            self.isLoading = false;
            self.$router.push('/clients');
          });
      }
    };

    return {
      schema,
      save,
    };
  },
  data() {
    return {
      model: {
        clientId: null,
        name: '',
      },
      isLoading: false,
    };
  },
  methods: {
    get() {
      if (this.$route.params.id) {
        this.isLoading = true;

        this.$proxies.clientProxy
          .get(this.$route.params.id)
          .then((x) => {
            this.model = x.data;
          })
          .catch((error) => {
            console.log(error);
            self.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "error",
              title: "Error :(",
              text: "No se pudo obtener el cliente",
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>