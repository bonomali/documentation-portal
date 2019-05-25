import ViewRegistry from '../../lib/ngn-ponyfills-vdom.js'

const Footer = new ViewRegistry({
  selector: '.authorio.docs.portal > footer',
  namespace: 'footer.',

  references: {
    year: '.year'
  },

  events: {
    populate (year) {
      Footer.render(Footer.ref.year, year)
    }
  }
})

export default Footer
