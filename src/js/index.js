import CurrentLocation from '../lib/CurrentLocation.js'
import APIConstructor from './api.js'
import Product from './data/product.js'

import Header from './view/header.js'
import VersionSelector from './view/version-selector.js'
import Search from './view/search.js'
import Sidebar from './view/sidebar.js'
import Content from './view/content.js'
import Footer from './view/footer.js'

import App from './view/app.js'
import Workspace from './view/workspace.js'

import Home from './content/home.js'
import Docs from './content/docs.js'

// TEMP: Remove when NGN2 is available
NGN.Queue = NGN.Tasks

export const API = new APIConstructor({
  baseURL: 'http://localhost:8016/',
  credentials: {}
})

export const ProductCategories = new NGN.DATA.Store({
  model: new NGN.DATA.Model({
    fields: {
      category: String
    },

    relationships: {
      products: [Product]
    }
  })
})

NGN.DOM.ready(() => {
  NGN.DOM.svg.update()
  Footer.emit('populate', new Date().getFullYear())

  API.fetchProducts(categories => {
    ProductCategories.once('load', () => {
      Sidebar.emit('populate', ProductCategories.records.map(category => ({
        label: category.label,
        children: category.products.records.map(product => ({
          label: product.title
        }))
      })))
    })

    return ProductCategories.load(categories)


    Products.once('load', () => {
      let queue = new NGN.Queue()

      queue.add('Fetch Product Manifests...', next => {
        Products.records.forEach(product => {
          if (product.manifest) {
            API.fetchManifest(product.manifest, manifest => {
              product.manifest = manifest
            })
          }
        })

        next()
      })

      queue.add('Initialize Home Page...', next => {
        Home.once('populated', () => {
          Content.emit('show', 'home')
          App.state = 'ready'
          next()
        })

        Home.emit('populate')
      })

      queue.run()
    })

    Products.load(products)
  })
})
