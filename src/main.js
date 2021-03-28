import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import firebase from 'firebase';
require('firebase/firestore');

/* Paste your firebase configuration below */
const config = {
  apiKey: "AIzaSyAqwGrsGECYz5rPCCVDa8Ifg9LzZzpg-8E",
  authDomain: "tablec1.firebaseapp.com",
  projectId: "tablec1",
  storageBucket: "tablec1.appspot.com",
  messagingSenderId: "324984288403",
  appId: "1:324984288403:web:b44276918ef7f13e3c4966",
  measurementId: "G-GYG7CR720P"
};

/* Initialize firebase with your configuration */
firebase.initializeApp(config);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
