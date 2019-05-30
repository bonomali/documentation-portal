import ViewRegistry from '../../../lib/ngn-ponyfills-vdom.js'
import App from './app.js'

const Toolbar = new ViewRegistry({
  parent: App,
  selector: '.toolbar',
  namespace: 'toolbar.'
})

export default Toolbar
