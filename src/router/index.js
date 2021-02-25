/*
 * @description: 
 * @Author: ljc
 * @Date: 2020-09-26 15:37:44
 * @LastEditors: ljc
 * @LastEditTime: 2020-10-31 17:19:06
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/details",
      component: () => import("../views/details.vue"),
    },
    {
      path: "/add",
      component: () => import("../views/add.vue"),
    },
    {
      path: "/mine",
      component: () => import("../views/mine.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/login.vue"),
    },
  ],
});
export default router