import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import Main from '../views/Main.vue'
import Dashboard from '../views/Dashboard.vue'
import Table from '../views/Table.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth
  },
  {
    path: "/main",
    name: "main",
    component: Main
  },
  {
    path: "/dashboard",
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
