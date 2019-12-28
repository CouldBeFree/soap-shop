import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f9367a70 = () => interopDefault(import('../pages/category/index.vue' /* webpackChunkName: "pages/category/index" */))
const _36fa4f9c = () => interopDefault(import('../pages/contact-us.vue' /* webpackChunkName: "pages/contact-us" */))
const _7a085d42 = () => interopDefault(import('../pages/selected-products.vue' /* webpackChunkName: "pages/selected-products" */))
const _dd56f506 = () => interopDefault(import('../pages/shop.vue' /* webpackChunkName: "pages/shop" */))
const _1d3bbe6e = () => interopDefault(import('../pages/shopping-cart.vue' /* webpackChunkName: "pages/shopping-cart" */))
const _4b5da989 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _26e516b3 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _18ac0d9b = () => interopDefault(import('../pages/category/baby-soap/index.vue' /* webpackChunkName: "pages/category/baby-soap/index" */))
const _578ae2b5 = () => interopDefault(import('../pages/category/bouquets/index.vue' /* webpackChunkName: "pages/category/bouquets/index" */))
const _2a6ee08c = () => interopDefault(import('../pages/category/cosmetic/index.vue' /* webpackChunkName: "pages/category/cosmetic/index" */))
const _42ee04cc = () => interopDefault(import('../pages/category/kits/index.vue' /* webpackChunkName: "pages/category/kits/index" */))
const _00c9355a = () => interopDefault(import('../pages/category/man/index.vue' /* webpackChunkName: "pages/category/man/index" */))
const _2dc1c54a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _f9367a70,
    name: "category"
  }, {
    path: "/contact-us",
    component: _36fa4f9c,
    name: "contact-us"
  }, {
    path: "/selected-products",
    component: _7a085d42,
    name: "selected-products"
  }, {
    path: "/shop",
    component: _dd56f506,
    name: "shop"
  }, {
    path: "/shopping-cart",
    component: _1d3bbe6e,
    name: "shopping-cart"
  }, {
    path: "/auth/login",
    component: _4b5da989,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _26e516b3,
    name: "auth-register"
  }, {
    path: "/category/baby-soap",
    component: _18ac0d9b,
    name: "category-baby-soap"
  }, {
    path: "/category/bouquets",
    component: _578ae2b5,
    name: "category-bouquets"
  }, {
    path: "/category/cosmetic",
    component: _2a6ee08c,
    name: "category-cosmetic"
  }, {
    path: "/category/kits",
    component: _42ee04cc,
    name: "category-kits"
  }, {
    path: "/category/man",
    component: _00c9355a,
    name: "category-man"
  }, {
    path: "/",
    component: _2dc1c54a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
