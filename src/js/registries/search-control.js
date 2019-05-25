import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import SecondaryHeader from './header/secondary.js'

const SearchBar = new ViewRegistry({
  parent: SecondaryHeader,
  selector: 'author-control.search',
  namespace: 'search.'
})

export default SearchBar
