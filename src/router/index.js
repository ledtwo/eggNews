import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'hash',
    routes:[
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component:()=>import('../views/home.vue')
      },
      {
        path: '/details',
        component:()=>import('../views/details.vue')
      },
      {
        path: '/add',
        component:()=>import('../views/add.vue')
      }
    ]
})
export default router