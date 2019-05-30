import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import { ProductCategories } from '../index.js'
import Workspace from '../view/workspace.js'
import Content from '../view/content.js'

const Home = new ViewRegistry({
  parent: Content,
  selector: '> .home',
  namespace: 'home.',

  references: {
    productList: '.products'
  },

  events: {
    populate () {
      Home.render(Home.ref.productList, ProductCategories.records.map(product => {
        return Home.createElement('li', {
          class: classNames(product.name, 'product')
        }, [
          Home.createElement('h2', {
            class: 'title'
          }, [product.title]),

          Home.createElement('section', {
            class: 'info'
          }, [
            Home.createElement('p', {
              class: 'description'
            }, [product.description]),

            Home.createElement('nav', {}, product.nav.records.map(item => {
              let cfg = {
                tag: 'button',
                attributes: {},
                on: {},
                children: [item.label]
              }

              if (item.href) {
                cfg.tag = 'a'
                cfg.attributes.href = item.href

                if (item.external) {
                  cfg.attributes.target = '_blank'
                }

              } else {
                cfg.attributes.class = 'bare'
                cfg.on.click = evt => Workspace.emit('product.load', product.name)
              }

              return Home.createElement(cfg)
            }))
          ])
        ])
      }))
      .then(element => Home.emit('populated'))
      .catch(err => console.error(err))
    }
  }
})

export default Home

// populate: products => this.render(this.ref.productList, products.map(product => {
//   return ['li', { class: classNames(product.name, 'product') }, [
//     ['h2', { class: 'title' }, [
//       product.title
//     ]],
//     ['section', { class: 'info' }, [
//       ['p', { class: 'description' }, [
//         product.description
//       ]],
//       ['nav', {}, product.nav.map(item => {
//         let isInternal = item.type === 'internal'
//
//         let tag = 'button'
//         let attributes = {}
//
//         if (isInternal) {
//           tag = 'a'
//           attributes.href = item.url
//         } else {
//           attributes.class = 'bare'
//         }
//
//         return [tag, attributes, [item.label]]
//       })]
//     ]]
//   ]]
// }))
