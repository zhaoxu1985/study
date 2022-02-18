import Vue from "vue";
import Router from "vue-router";

const add = () => import( /* webpackChunkName: "add" */ "./components/my-window");
const subtraction = () =>import( /* webpackChunkName: "subtraction" */ "./components/subtraction.vue");

const vfor = () =>import( /* webpackChunkName: "for" */ "./components/vfor.vue");

const asyncComponent = () =>import( /* webpackChunkName: "asyncCompoenent" */ "@/components/asyncComponent/");




Vue.use(Router);
export default new Router({
  routes: [{
      path: "/",
      name: "add",
      redirect: '/asyncComponent',
    },
    {
      path: "/subtraction",
      component: subtraction,
    },
    {
      path: "/asyncComponent",
      name:'asyncComponent',
      component: asyncComponent,
    },
    {
      path: '/add',
      component: add,
    },
    {
      path: '/vfor',
      component: vfor,
    }
  ],
});