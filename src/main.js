import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyAEvZSISKc4LVb5VOH5IHeRDANtTRSJMKQ",
      authDomain: "pagebook-582c2.firebaseapp.com",
      projectId: "pagebook-582c2",
      storageBucket: "pagebook-582c2.appspot.com",
      messagingSenderId: "171065442052",
      appId: "1:171065442052:web:96eafccf5071396de55a51",
      measurementId: "G-MT0YJLZTM7",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  },
}).$mount("#app");
