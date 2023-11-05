<template>
  <v-app>
    <!-- Menú de la aplicación -->
    <v-app-bar class="bg-light-blue-darken-3">
      <v-app-bar-title>VentaXperto</v-app-bar-title>
      <!-- Se muestra cuando no haya usuario logueado -->
      <template v-if="this.$store.getters.getUsuario == null">
        <v-btn prepend-icon="mdi-login" to="/">Login</v-btn>
      </template>
      <!-- Se muestran cuando hay un usuario logueado -->
      <template v-if="this.$store.getters.getUsuario !== null">
        <v-btn prepend-icon="mdi-home" to="/welcome">Inicio</v-btn>
        <v-btn prepend-icon="mdi-account" to="/cliente">Cliente</v-btn>
        <v-btn prepend-icon="mdi-logout" @click="logout">Logout</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // Este método realiza el cierre de sesión
    logout() {
      // Vaciando el estado de la aplicación y el almacenamiento local (storage)
      this.$store.dispatch('logout');
      // Redireccionando al inicio de sesión
      this.$router.push('/');
    },
    // Este método verifica si hay una sesión para mantener al usuario en la aplicación o expulsarlo
    validarAcceso() {
      let datos = localStorage.getItem('userData');
      if (datos) {
        // Si hay datos en el almacenamiento local, se valida el acceso
        this.$store.dispatch('login', JSON.parse(datos));
        this.$router.push('/welcome');
      } else {
        // Si no hay datos, se redirecciona al inicio de sesión
        this.$router.push('/');
      }
    },
  },
  created() {
    // El método se ejecuta cada vez que el componente se crea
    this.validarAcceso();
  },
};
</script>