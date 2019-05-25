import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const View = new ViewRegistry({
  selector: '.authorio.docs.portal > main .views',
  namespace: 'views.',

  references: {
    views: '.view'
  },

  events: {
    goto: view => View.self.element.show(`.${view}`)
  }
})

export default View
