import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import Content from '../registries/content.js'

const Home = new ViewRegistry({
  parent: Content,
  selector: '.home',
  namespace: 'home.',

  references: {
    productList: '.products'
  },

  events: {
    populate: products => {
      Home.render(Home.ref.productList, products.map(product => {
        return Home.createElement('li', {
          class: classNames(product.id, 'product')
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

            Home.createElement('nav', {}, product.nav.map(item => {
              let cfg = {
                tag: 'button',
                attributes: {},
                on: {},
                children: [item.label]
              }

              if (item.type === 'external') {
                cfg.tag = 'a'
                cfg.attributes.href = item.url
                cfg.attributes.target = '_blank'
              } else {
                cfg.tag = 'button'
                cfg.attributes.class = 'bare'
                cfg.on.click = evt => Content.emit('show', {
                  view: product.id,
                  path: item.path
                })
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

// return [
//   ['li', {
//     class: 'test'
//   }, [innerHTML]],
//
//   ['li', {
//     class: 'test'
//   }, component, [innerHTML]], // If there is a component there, add it
//
//   ['li', {
//     class: 'test'
//   }, {
//     listener: 'if there is an object here, add listeners, if an array, add children'
//   }, [innerHTML]]
// ]

// populate (products) {
//   Home.render(Home.ref.productList, products.map(product => [
//     'li', {
//       class: classNames(product.id, 'product')
//     }, [
//       [
//         'h2', {
//           class: 'title'
//         }, [product.title]
//       ],
//       [
//         'section', {
//           class: 'info'
//         }, [
//           [
//             'p', {
//               class: 'description'
//             }, [product.description]
//           ],
//
//           [
//             'nav', {}, product.nav.map(item => {
//               let isInternal = item.type === 'internal'
//
//               let tag = 'button'
//               let attributes = {}
//
//               if (isInternal) {
//                 tag = 'a'
//                 attributes.href = item.url
//               } else {
//                 attributes.class = 'bare'
//               }
//
//               return [tag, attributes, [item.label]]
//             })
//           ]
//         ]
//       ]
//     ]
//   ]))
// }
