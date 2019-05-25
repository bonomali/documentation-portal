import ViewRegistry from '../../../lib/ngn-ponyfills-vdom.js'
import App from '../app.js'

const SecondaryHeader = new ViewRegistry({
  selector: '.authorio.docs.portal > header .secondary',
  namespace: 'header.secondary.',

  states: {
    hidden () {
      this.self.element.classList.add('hidden')
    },

    visible () {
      this.self.element.classList.remove('hidden')
    }
  },

  initialState: 'hidden',

  reflexes: [
    {
      registry: App,
      reactions: {
        loading: 'hidden',
        ready: 'visible'
      }
    }
  ]
})

export default SecondaryHeader
