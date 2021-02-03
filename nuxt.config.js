import { resolve } from 'path'
const config = require(resolve(process.cwd(), './shared/nuxtConfig'))
let { HTTP_ENDPOINT, ONESIGNAL_APP_ID, WWW_URL, dev } = require(resolve(
  process.cwd(),
  '../shared/config'
))
// delete config.fontawesome
delete config.buildModules
config.plugins.push({ src: '~/shared/plugins/map.js', ssr: false })
config.plugins.push({ src: '~/shared/plugins/timer.js', ssr: false })
// config.plugins.push({ src: '~/shared/plugins/drift.js', ssr: false })
// config.plugins.push(
//   { src: '~/shared/plugins/vue-simple-photoswipe.js', ssr: false },
// )
config.buildModules = [
  '@nuxtjs/apollo',
  '@nuxtjs/robots',
  // '@nuxtjs/onesignal',
  '@nuxtjs/pwa',
  '@nuxtjs/tailwindcss',
  'vue-social-sharing/nuxt',
  '@nuxtjs/toast',
]
config.modules = [
  '@nuxtjs/proxy',
  'cookie-universal-nuxt',
  '@nuxtjs/google-analytics',
]
config.pwa = {
  manifest: {
    name: 'Misiki',
    theme_color: '#85D715',
  },
}
const server = dev ? 'http://localhost:8888' : WWW_URL
HTTP_ENDPOINT = HTTP_ENDPOINT || 'https://apiv2.misiki.in'

config.apollo = {
  // watchLoading: '../shared/plugins/apollo-watch-loading-handler.js',
  // errorHandler: './plugins/apollo-error-handler.js',
  clientConfigs: {
    default: {
      httpEndpoint: server + '/graphql',
      wsEndpoint: HTTP_ENDPOINT.replace('http', 'ws') + '/graphql',
    },
  },
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'no-cache',
    },
  },
}
// config.apollo.clientConfigs.default.httpEndpoint = server
// config.oneSignal = {
//   init: {
//     appId: ONESIGNAL_APP_ID,
//     allowLocalhostAsSecureOrigin: true,
//     welcomeNotification: {
//       disable: true,
//     },
//   },
// }
export default config
