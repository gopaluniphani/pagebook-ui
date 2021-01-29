import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_LOCATION: 'http://10.177.1.102:8760/pagebook/api',
    AUTH_LOCATION: 'http://10.177.2.29:9005/auth',
    userDetails: {},
    logout: localStorage.getItem("userId") === null ? true : false,
    getTokenConfig: function () {
      return {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }
    }
  },
});
