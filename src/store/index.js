import { createStore } from 'vuex';

export default createStore({
  state: {
    // Variables de estado global en la aplicación
    usuario: null, // Inicialmente el usuario es nulo
    token: null    // Inicialmente el token es nulo
  },
  getters: {
    // Retorna el usuario
    getUsuario(state) {
      return state.usuario;
    },
    // Retorna el token
    getToken(state) {
      return state.token;
    }
  },
  mutations: {
    // Modifica el valor del usuario
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    // Modifica el valor del token
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    // Acción para realizar el inicio de sesión (login)
    login(context, data) {
      // Llenar variables de estado con el usuario y el token
      context.commit('setUsuario', data.usuario);
      context.commit('setToken', data.token);

      // Guardar data en el almacenamiento local (local storage)
      localStorage.setItem('userData', JSON.stringify(data));
    },
    // Acción para realizar el cierre de sesión (logout)
    logout(context) {
      // Vaciar variables de estado al hacer logout
      context.commit('setUsuario', null);
      context.commit('setToken', null);

      // Eliminar data del almacenamiento local (local storage)
      localStorage.removeItem('userData');
    }
  }
});