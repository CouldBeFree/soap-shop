import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _22b1fa9c = () => interopDefault(import('../pages/category/index.vue' /* webpackChunkName: "pages/category/index" */))
const _492d1a06 = () => interopDefault(import('../pages/contact-us.vue' /* webpackChunkName: "pages/contact-us" */))
const _4420cdea = () => interopDefault(import('../pages/selected-products.vue' /* webpackChunkName: "pages/selected-products" */))
const _4bf9b651 = () => interopDefault(import('../pages/shop.vue' /* webpackChunkName: "pages/shop" */))
const _c38387cc = () => interopDefault(import('../pages/shopping-cart.vue' /* webpackChunkName: "pages/shopping-cart" */))
const _9ff02946 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _b030d742 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _2b848c6f = () => interopDefault(import('../pages/category/baby-soap/index.vue' /* webpackChunkName: "pages/category/baby-soap/index" */))
const _9a058d3e = () => interopDefault(import('../pages/category/bouquets/index.vue' /* webpackChunkName: "pages/category/bouquets/index" */))
const _f43d9190 = () => interopDefault(import('../pages/category/cosmetic/index.vue' /* webpackChunkName: "pages/category/cosmetic/index" */))
const _0ba98a46 = () => interopDefault(import('../pages/category/kits/index.vue' /* webpackChunkName: "pages/category/kits/index" */))
const _43209327 = () => interopDefault(import('../pages/category/man/index.vue' /* webpackChunkName: "pages/category/man/index" */))
const _45a3b910 = () => interopDefault(import('../pages/category/souvenir/index.vue' /* webpackChunkName: "pages/category/souvenir/index" */))
const _02ab4262 = () => interopDefault(import('../pages/category/woman/index.vue' /* webpackChunkName: "pages/category/woman/index" */))
const _5d3b9d0f = () => interopDefault(import('../pages/product/_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _f9bff1f2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/category",
    component: _22b1fa9c,
    name: "category"
  }, {
    path: "/contact-us",
    component: _492d1a06,
    name: "contact-us"
  }, {
    path: "/selected-products",
    component: _4420cdea,
    name: "selected-products"
  }, {
    path: "/shop",
    component: _4bf9b651,
    name: "shop"
  }, {
    path: "/shopping-cart",
    component: _c38387cc,
    name: "shopping-cart"
  }, {
    path: "/auth/login",
    component: _9ff02946,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _b030d742,
    name: "auth-register"
  }, {
    path: "/category/baby-soap",
    component: _2b848c6f,
    name: "category-baby-soap"
  }, {
    path: "/category/bouquets",
    component: _9a058d3e,
    name: "category-bouquets"
  }, {
    path: "/category/cosmetic",
    component: _f43d9190,
    name: "category-cosmetic"
  }, {
    path: "/category/kits",
    component: _0ba98a46,
    name: "category-kits"
  }, {
    path: "/category/man",
    component: _43209327,
    name: "category-man"
  }, {
    path: "/category/souvenir",
    component: _45a3b910,
    name: "category-souvenir"
  }, {
    path: "/category/woman",
    component: _02ab4262,
    name: "category-woman"
  }, {
    path: "/product/:id?",
    component: _5d3b9d0f,
    name: "product-id"
  }, {
    path: "/",
    component: _f9bff1f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
