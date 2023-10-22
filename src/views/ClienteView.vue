<template>
    <v-container fluid>
      <h1>Clientes</h1>
      <v-row>
        <!-- Formulario para agregar cliente -->
        <v-col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
          <v-text-field
            label="Nombre"
            maxlength="50"
            counter
            color="indigo"
            clearable
            placeholder="Nombre del cliente"
            v-model="cliente.nombre"
          ></v-text-field>
          <v-text-field
            label="Teléfono"
            maxlength="9"
            counter
            color="indigo"
            clearable
            placeholder="Teléfono del cliente"
            v-model="cliente.telefono"
          ></v-text-field>
          <v-select
            color="indigo"
            label="País"
            :items="paises"
            item-value="id"
            item-title="nombre"
            v-model="cliente.fk_pais"
          ></v-select>
          <v-btn
            prepend-icon="mdi-check"
            color="indigo"
            block
            @click="agregarCliente"
          >Agregar</v-btn>
        </v-col>
        <!-- Tabla para mostrar clientes -->
        <v-col cols="9" xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
          <v-card>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>País</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <th>Marcela</th>
                    <th>El Salvador</th>
                    <th>
                      <v-btn-group>
                        <v-btn icon="mdi-eye" color="indigo"></v-btn>
                        <v-btn icon="mdi-pencil" color="green"></v-btn>
                        <v-btn icon="mdi-delete" color="red"></v-btn>
                      </v-btn-group>
                    </th>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">
      {{ mensaje }}
    </v-snackbar>
  </template>
<script>
// Importación de axios
import axios from 'axios';

export default {
  name: 'ClienteView',
  data() {
    return {
      cliente: {},
      alertaEstado: false,
      mensaje: '',
      paises: [],
    };
  },
  methods: {
    // Petición para insertar clientes
    agregarCliente() {
      axios
        .post('http://127.0.0.1:8000/api/cliente/store', this.cliente)
        .then((response) => {
          if (response.data.code == 200) {
            // Cambiar mensaje y visibilidad de alerta
            this.alertaEstado = true;
            this.mensaje = response.data.data;
            // Recargar tabla
            this.obtenerClientes();
            // Limpiar formulario
            this.cliente = {};
          }
        })
        .catch((error) => console.log('Ha ocurrido un error ' + error));
    },
    // Petición para obtener países
    obtenerPaises() {
      axios
        .get('http://127.0.0.1:8000/api/pais/select')
        .then((response) => {
          if (response.data.code == 200) {
            let res = response.data;
            this.paises = res.data;
          }
        })
        .catch((error) => console.log('Ha ocurrido un error ' + error));
    },
  },
  created() {
    this.obtenerPaises();
  },
};
</script>