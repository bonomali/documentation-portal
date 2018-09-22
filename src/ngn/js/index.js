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

        Product.namespaces.load({
          "type": "namespace",
          "label": "global",
          "description": null,
          "code": null,
          "tags": {},
          "exceptions": {},
          "events": {},
          "start": {
            "line": 0,
            "column": 0
          },
          "end": {
            "line": 0,
            "column": 0
          },
          "flags": [],
          "authors": [],
          "sourcefile": null,
          "properties": {},
          "methods": {},
          "namespaces": [],
          "classes": [
            {
              "href": "/CustomException.json",
              "name": "CustomException"
            },
            {
              "href": "/EventEmitterBase.json",
              "name": "EventEmitterBase"
            },
            {
              "href": "/NGNDateField.json",
              "name": "NGNDateField"
            },
            {
              "href": "/Network.json",
              "name": "Network"
            },
            {
              "href": "/TreeLeaf.json",
              "name": "TreeLeaf"
            },
            {
              "href": "/TreeNode.json",
              "name": "TreeNode"
            }
          ]
        })

        // for (let ns in namespaces) {
        //   // Product.resources[ns] = new NGN.NET.Resource({
        //   //   baseUrl: namespaces[ns]
        //   // })``
        //
        //   // NGN.NET.json(`${API.baseUrl}${namespaces[ns]}`, (err, data) => {
        //   //   if (err) {
        //   //     throw err
        //   //   }
        //   //
        //   //   Product.namespaces.load(data)
        //   // })
        // }
      }
    },

    model: {
      initiated: () => {
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
