import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import { API, ProductCategories } from '../index.js'
import Product from '../data/product.js'
import App from './app.js'

// TODO: Move this into Workspace properties once JET is available
const CurrentProduct = new Product()

const Workspace = new ViewRegistry({
  parent: App,
  selector: '.workspace',
  namespace: 'workspace.',

  events: {
    product: {
      load (name) {
        let product = NGN.coalesce(ProductCategories.find({ name })[0], name)

        if (!product) {
          return console.error(`Invalid content identifier "${name}"`)
        }

        CurrentProduct.load(product)
      }
    }
  },

  init () {
    CurrentProduct.on('load', () => {
      this.emit('sidebar.populate', CurrentProduct)
      this.emit('content.docs.populate', CurrentProduct)
    })

    this.self.on({
      beforechange: evt => {
        evt.preventDefault()
        this.emit('loading')

        // NOTE: If the timeout duration changes, it also must be updated
        // in css/layout/_main.css and js/view/app.js
        setTimeout(evt.detail.next, 236)
      },

      change: evt => this.emit('loaded')
    })
  }
})

export default Workspace
