<template>
  <div class="p-6">
    <h1 class="title">{{ model.productId ? model.name : "Nuevo producto" }}</h1>
    <h2 class="subtitle">
      {{ model.productId ? model.description : "Agrega un nuevo producto." }}
    </h2>

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
        <Field
          v-model="model.price"
          class="input"
          :class="{ 'is-danger': errors.price }"
          type="number"
          name="price"
          placeholder="Ingrese el precio"
        />
        <p class="help is-danger">{{ errors.price }}</p>
      </div>
      <div class="field">
        <Field
          v-model="model.description"
          v-slot="{ field }"
          name="description"
        >
          <textarea
            class="textarea"
            :class="{ 'is-danger': errors.description }"
            v-bind="field"
            rows="2"
            placeholder="Ingrese la descripción"
          ></textarea>
        </Field>
        <p class="help is-danger">{{ errors.description }}</p>
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
      price: Yup.number().required("El precio es requerido"),
      description: Yup.string().required("La descripcion es requerida"),
    });

    const save = (values) => {
      self.isLoading = true;

      values.price = parseFloat(values.price);

      if (!self.$route.params.id) {
        // display form values on success
      self.$proxies.productProxy
        .create(values)
        .then((x) => {
          self.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Message",
            text: "Se agrego el nuevo producto",
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
            text: "No se pudo crear el producto",
          });
        })
        .finally(() => {
          self.isLoading = false;
          self.$router.push('/products');
        });
      } else {
        // display form values on success
        self.$proxies.productProxy
          .update(self.model.productId, values)
          .then((x) => {
            self.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: "Message",
              text: "Se actualizo el producto correctamente",
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
              text: "No se pudo actualizar el producto",
            });
          })
          .finally(() => {
            self.isLoading = false;
            self.$router.push('/products');
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
        productId: null,
        name: '',
        description: '',
        price: 0,
      },
      isLoading: false,
    };
  },
  methods: {
    get() {
      if (this.$route.params.id) {
        this.isLoading = true;

        this.$proxies.productProxy
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
              text: "No se pudo obtener el producto",
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