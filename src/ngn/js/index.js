const baseUrl = 'data/dummy.json'

// const API = new NGN.NET.Resource({
//   credentials: {},
//   baseUrl: '../../dummy.json'
// })

const Product = {}

NGNX.Loader({
  sync: [
    './js/models/CodePosition.js',
    './js/models/Snippet.js',
    './js/models/Tag.js',
    './js/models/Parameter.js',
    './js/models/Event.js',
    './js/models/Exception.js',
    './js/models/Construct.js',
    './js/models/Property.js',
    './js/models/Return.js',
    './js/models/Method.js',
    './js/models/Class.js',
    './js/models/api.js'
  ]
}, () => {})

NGN.BUS.on('models.ngn.initiated', evt => {
  Product.data.once('load', () => Product.view.emit('populate'))
  Product.view.fetchProductData(baseUrl)
})
