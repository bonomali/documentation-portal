import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import ViewController from '../registries/view-controller.js'

export const HomeView = new ViewRegistry({
  parent: ViewController,
  selector: '.home.view',
  namespace: 'home.',

  references: {
    productList: '.products'
  },

  events: {
    populate: products => {
      HomeView.render(HomeView.ref.productList, products.map(product => {
        return HomeView.createElement('li', {
          class: classNames(product.id, 'product')
        }, [
          HomeView.createElement('h2', {
            class: 'title'
          }, [product.title]),

          HomeView.createElement('section', {
            class: 'info'
          }, [
            HomeView.createElement('p', {
              class: 'description'
            }, [product.description]),

            HomeView.createElement('nav', {}, product.nav.map(item => {
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
                cfg.on.click = evt => ViewController.emit('goto', {
                  view: product.id,
                  path: item.path
                })
              }

              return HomeView.createElement(cfg)
            }))
          ])
        ])
      }))
      .then(element => HomeView.emit('populated'))
      .catch(err => console.error(err))
    }
  }
})

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
//   HomeView.render(HomeView.ref.productList, products.map(product => [
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
