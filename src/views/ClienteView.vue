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
                    <tr v-for="(cliente, i) in clientes" :key="i">
                      <th>{{ cliente.id }}</th>
                      <th>{{ cliente.nombre }}</th>
                      <th>{{ cliente.fk_pais }}</th>
                      <th>
                        <v-btn-group>
                          <v-btn icon="mdi-eye" color="indigo"  @click="obtenerCliente(cliente.id,1)" ></v-btn>
                          <v-btn icon="mdi-pencil" color="green" @click="obtenerCliente(cliente.id,2)"></v-btn>
                          <v-btn icon="mdi-delete" color="red" @click="eliminarCliente(cliente.id)"></v-btn>
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
    <v-dialog v-model="dialogOne" transition="dialog-top-transition" width="500">
      <v-card title="Ver" subtitle="Datos del cliente">
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="mdi-account" :title="datos.nombre"></v-list-item>
            <v-list-item prepend-icon="mdi-phone" :title="datos.telefono"></v-list-item>
            <v-list-item prepend-icon="mdi-earth" :title="datos.pais"></v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
      <v-card title="Editar" subtitle="Datos del cliente">
        <v-card-text>
          <v-text-field
            label="Nombre"
            maxlength="50"
            counter
            color="indigo"
            clearable
            placeholder="Nombre del cliente"
            v-model="datos.nombre"
          ></v-text-field>
          <v-text-field
            label="Teléfono"
            maxlength="9"
            counter
            color="indigo"
            clearable
            placeholder="Teléfono del cliente"
            v-model="datos.telefono"
          ></v-text-field>
          <v-select
            color="indigo"
            label="País"
            :items="paises"
            item-value="id"
            item-title="nombre"
            v-model="datos.fk_pais"
          ></v-select>
          <v-btn
            prepend-icon="mdi-check"
            color="indigo"
            block
            @click="modificarCliente(datos.id)"
          >Guardar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

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
      clientes: [],
      datos: {},
      dialogOne: false,
      dialogTwo: false,


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
    // Función para obtener datos de un cliente
    obtenerCliente(id, action) {
      // Cambiar la visibilidad del modal ver/editar
      if(action==1){
        this.dialogOne = true
      } else {
        this.dialogTwo = true
        }
      // Realizar petición para consultar datos del cliente
      axios.get(`http://127.0.0.1:8000/api/cliente/find/${id}`)
        .then(response => {
          if (response.data.code === 200) {
            // Si la respuesta es exitosa, asignamos los datos a la variable "datos"
            let res = response.data;
            this.datos = res.data;
          }
        })
        .catch(error => {
          // En caso de error, mostramos un mensaje de error en la consola
          console.log('Ha ocurrido un error ' + error);
        });
    },
    // Función para modificar datos de un cliente
    modificarCliente(id) {
      // Realizar una petición PUT para actualizar los datos del cliente
      axios.put(`http://127.0.0.1:8000/api/cliente/update/${id}`, this.datos)
        .then(response => {
          if (response.data.code === 200) {
            // Si la respuesta es exitosa (código 200), realizar las siguientes acciones:

            // Cambiar el mensaje y la visibilidad de la alerta
            this.alertaEstado = true;
            this.mensaje = response.data.data;

            // Ocultar el cuadro de diálogo
            this.dialogTwo = false;

            // Recargar la tabla de clientes (asumiendo que hay un método obtenerClientes para esto)
            this.obtenerClientes();
          }
        })
        .catch(error => {
          // En caso de error, mostrar un mensaje de error en la consola
          console.log('Ha ocurrido un error ' + error);
        });
    },
    // Función para eliminar un cliente
    eliminarCliente(id) {
      // Realizar una petición DELETE para eliminar el cliente
      axios.delete(`http://127.0.0.1:8000/api/cliente/delete/${id}`)
        .then(response => {
          if (response.data.code === 200) {
            // Si la respuesta es exitosa (código 200), realizar las siguientes acciones:

            // Cambiar el mensaje y la visibilidad de la alerta
            this.alertaEstado = true;
            this.mensaje = response.data.data;

            // Recargar la tabla de clientes (asumiendo que hay un método obtenerClientes para esto)
            this.obtenerClientes();
          }
        })
        .catch(error => {
          // En caso de error, mostrar un mensaje de error en la consola
          console.log('Ha ocurrido un error ' + error);
        });
    }
  },
  created() {
    this.obtenerPaises();
  },
};
</script>