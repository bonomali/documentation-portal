import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const App = new ViewRegistry({
  selector: '.authorio.docs.portal > main .app',
  namespace: 'app.',

  references: {
    loader: '.loader',
    main: '.main'
  },

  states: {
    ready () {
      this.self.element.show(1)
    },

    loading () {
      this.self.element.show(0)
    }
  },

  initialState: 'loading',

  events: {
    content: {
      loading () {
        App.state = 'loading'
      },

      loaded () {
        App.state = 'ready'
      }
    }
  },

  init () {
    this.self.on({
      beforechange: evt => {
        evt.preventDefault()

        let { currentSelection, nextSelection, next } = evt.detail

        this.self.element.setAttribute('transition', '')
        currentSelection.element.setAttribute('fade-out', '')

        // NOTE: If the timeout duration changes, it also must be updated
        // in css/layout/_main.css and js/app/content.js
        setTimeout(next, 236)
      },

      change: evt => {
        let { previousSelection, currentSelection } = evt.detail

        this.self.element.removeAttribute('transition')
        previousSelection.element.removeAttribute('fade-out')
        currentSelection.element.setAttribute('fade-in', '')

        // NOTE: If the timeout duration changes, it also must be updated
        // in css/layout/_main.css
        setTimeout(() => {
          currentSelection.element.removeAttribute('fade-in')
        }, 382)
      }
    })
  }
})

export default App
