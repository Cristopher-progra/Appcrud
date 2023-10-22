<template>
  <v-app>
    <!-- Menú de la aplicación -->
    <v-app-bar class="bg-light-blue-darken-3">
      <v-app-bar-title>VentaXperto</v-app-bar-title>
      <v-btn prependIcon="mdi-home" to="/">Inicio</v-btn>
      <v-btn prependIcon="mdi-account" to="/cliente">Cliente</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>