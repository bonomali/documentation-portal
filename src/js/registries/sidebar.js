import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const Sidebar = new ViewRegistry({
  selector: '.authorio.docs.portal > main .sidebar',
  namespace: 'sidebar.',

  states: {
    hidden () {
      this.self.element.classList.add('hidden')
    },

    visible () {
      this.self.element.classList.remove('hidden')
    }
  },

  initialState: 'hidden'
})

export default Sidebar
