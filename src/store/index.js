import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_LOCATION: 'http://10.177.1.241:8760/pagebook/api',
    userDetails: {},
    logout: true
  },
});
