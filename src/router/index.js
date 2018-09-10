import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/Home/Home.vue"
import Search from "../pages/Search/Search.vue"
import Order from "../pages/Order/Order.vue"
import Profile from "../pages/Profile/Profile.vue"
import Login from "../pages/Login/Login.vue"

import Shop from "../pages/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo.vue"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue"


//声明使用插件
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: Home,

    },

    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
