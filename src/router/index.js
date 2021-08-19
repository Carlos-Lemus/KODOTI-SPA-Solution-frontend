import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import Clients from '../views/clients/Clients.vue'
import ClientCreateOrUpdate from '../views/clients/ClientCreateOrUpdate.vue'
import Products from '../views/products/Products.vue'
import ProductCreateOrUpdate from '../views/products/ProductCreateOrUpdate.vue'
import Orders from '../views/orders/Orders.vue'
import OrderDetail from '../views/orders/OrderDetail.vue'
import OrderCreate from '../views/orders/OrderCreate.vue'
import Users from '../views/Users.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/signup',
    name: 'LoginAndRegister',
    component: LoginAndRegister,
    beforeEnter: authorization
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    beforeEnter: authorization
  },
  {
    path: '/clients/create',
    name: 'ClientCreate',
    component: ClientCreateOrUpdate,
    beforeEnter: authorization
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientUpdate',
    component: ClientCreateOrUpdate,
    beforeEnter: authorization
  },

  {
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter: authorization
  },
  {
    path: '/products/create',
    name: 'ProductsCreate',
    component: ProductCreateOrUpdate,
    beforeEnter: authorization
  },
  {
    path: '/products/:id/edit',
    name: 'ProductsUpdate',
    component: ProductCreateOrUpdate,
    beforeEnter: authorization
  },

  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: authorization
  },
  {
    path: '/orders/create',
    name: 'OrderCreate',
    component: OrderCreate,
    beforeEnter: authorization
  },
  {
    path: '/orders/:id/detail',
    name: 'OrderDetail',
    component: OrderDetail,
    beforeEnter: authorization
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: authorization
  },

];

function authorization(to, from, next) {

  const user = store.getters.user;

  if (user) {

    if ((to.name === 'Clients' || to.name === 'Products' || to.name === 'Users') && !user.roles.includes('Admin')) {
      return next('/');
    }

    if (to.name === 'LoginAndRegister') {
      return next('/');
    }

  }

  next();
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
