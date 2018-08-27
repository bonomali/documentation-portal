const baseUrl = 'api/dummy.json'

// const API = new NGN.NET.Resource({
//   credentials: {},
//   baseUrl: '../../dummy.json'
// })

NGNX.Loader({
  sync: [
    './js/models/api.js',
    './js/registries/main.js'
  ]
}, () => {})
