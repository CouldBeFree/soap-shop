import path from 'path';
import fs from 'fs';

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Roboto:400,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0579FC' },
  /*
  ** Global CSSv-scroll-lock="opened"
  */
  css: [
    '~/assets/icons/icomoon/style.css',
    '~/assets/bootstrap-grid.css',
    '~/assets/main.css',
    'vue-loading-overlay/dist/vue-loading.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/carousel.js', ssr: false },
    { src: '~plugins/lazyload.js', ssr: false },
    { src: '~plugins/validate.js', ssr: false },
    { src: '~plugins/preloader.js', ssr: false },
    { src: '~plugins/scrollLock.js', ssr: false }
  ],
  /*server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  },*/
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://localhost:5050/api/v1/'
  },
  styleResources: {
    scss: [
      'assets/scss/variables.scss',
      'assets/scss/mixins.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
