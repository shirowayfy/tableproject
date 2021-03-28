import Vue from "vue";
import Vuex from "vuex";

import students from './modules/students'
import user from './modules/user'
import marked from './modules/marked'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    students,
    user,
    marked
  }
});
