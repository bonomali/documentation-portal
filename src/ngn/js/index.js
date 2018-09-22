// const API = new NGN.NET.Resource({
//   credentials: {},
//   baseUrl: 'http://localhost:8015/'
// })

const API = {
  credentials: {},
  baseUrl: 'http://localhost:8015/'
}

const Product = {
  resources: {}
}

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
    './js/models/Namespace.js'
  ]
}, () => {})

NGN.BUS.on({
  product: {
    manifest: {
      loaded: () => {
        let { namespaces } = Product.manifest

        for (let ns in namespaces) {
          // Product.resources[ns] = new NGN.NET.Resource({
          //   baseUrl: namespaces[ns]
          // })``

          NGN.NET.json(`${API.baseUrl}${namespaces[ns]}`, (err, data) => {
            if (err) {
              throw err
            }

            Product.namespaces.load(data)
          })
        }
      }
    },

    model: {
      initiated: () => {
        console.log(new NamespaceModel());

        Product.namespaces = new NGN.DATA.Store({
          model: NamespaceModel
        })

        // Product.model.once('load', () => Product.view.emit('populate'))

        NGN.NET.json(API.baseUrl, (err, data) => {
          if (err) {
            throw err
          }

          Product.manifest = data
          NGN.BUS.emit('product.manifest.loaded')
        })
      }
    }
  }
})
