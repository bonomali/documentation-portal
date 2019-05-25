import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import Header from './header.js'

const SearchBar = new ViewRegistry({
  parent: Header,
  selector: 'author-control.search',
  namespace: 'search.'
})

export default SearchBar
