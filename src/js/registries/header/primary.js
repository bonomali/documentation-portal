import ViewRegistry from '../../../lib/ngn-ponyfills-vdom.js'

const PrimaryHeader = new ViewRegistry({
  selector: '.authorio.docs.portal > header .primary',
  namespace: 'header.primary.',

  references: {
    activeSection: '.title .active-section',
    versionTag: '.title .version.tag'
  },

  events: {
    populate (section, version) {
      PrimaryHeader.render(PrimaryHeader.ref.activeSection, section)
      PrimaryHeader.render(PrimaryHeader.ref.versionTag, `v${version}`)
    }
  }
})

export default PrimaryHeader
