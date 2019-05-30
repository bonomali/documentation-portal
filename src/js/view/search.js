import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import Toolbar from './toolbar.js'

const Search = new ViewRegistry({
  parent: Toolbar,
  selector: 'author-control.search',
  namespace: 'search.'
})

export default Search
