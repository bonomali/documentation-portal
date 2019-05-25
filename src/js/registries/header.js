import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const Header = new ViewRegistry({
  selector: '.authorio.docs.portal > header',
  namespace: 'header.',

  references: {
    activeSection: '.title .active-section',
    versionTag: '.title .version.tag'
  },

  events: {
    populate (section, version) {
      Header.render(Header.ref.activeSection, section)
      Header.render(Header.ref.versionTag, `v${version}`)
    }
  }
})

export default Header
