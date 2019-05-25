import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'
import PrimaryHeader from './header/primary.js'

const VersionSelector = new ViewRegistry({
  parent: PrimaryHeader,
  selector: 'author-control.version',
  namespace: 'version-selector.',

  properties: {
    currentSection: String
  },

  states: {
    hidden () {
      this.self.element.classList.add('hidden')
    },

    visible () {
      this.self.element.classList.remove('hidden')
    }
  },

  initialState: 'hidden',

  events: {
    populate (section, versions = []) {
      if (versions.length > 0) {
        VersionSelector.self.element.clear()

        versions.forEach(version => {
          console.log(`Add version ${version} option`)
        })
      }
    }
  }
})

export default VersionSelector
