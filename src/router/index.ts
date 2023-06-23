import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/login.vue'
import Products from '../views/products.vue'
import ProductDetails from '../views/product-details.vue'
import CatalogProductDetails from '../views/catalog-product-details.vue'
import Orders from '../views/orders.vue'
import Catalog from '../views/catalog.vue'
import Settings from '../views/settings.vue'
import store from '@/store'


const authGuard = (to: any, from: any, next: any) => {
  if (store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/login")
  }
};

const loginGuard = (to: any, from: any, next: any) => {
  if (!store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/")
  }
};


const routes: Array<RouteRecordRaw> = [
   {
    path: '/',
    redirect: '/orders'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: loginGuard
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    beforeEnter: authGuard
  },
  {
    path: '/product-details/:id',
    name: 'Product-details',
    component: ProductDetails,
    beforeEnter: authGuard
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: authGuard
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    beforeEnter: authGuard
  },
  {
    path: '/catalog-product-details/:productId/:variantId',
    name: 'Catalog-product-details',
    component: CatalogProductDetails,
    beforeEnter: authGuard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter: authGuard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
