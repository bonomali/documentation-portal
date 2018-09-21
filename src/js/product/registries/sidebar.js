Product.view.sidebar = new NGNX.VIEW.Registry({
  parent: Product.view,
  selector: 'aside.sidebar',
  namespace: 'sidebar.',

  references: {
    accordion: '> .content > nav',

    expandButton: 'button.expand',
    collapseButton: 'button.collapse'
  },

  states: {
    collapsed () {
      this.self.element.classList.remove('expanded')
      this.emit('collapsed')
    },

    expanded () {
      this.self.element.classList.add('expanded')
      this.emit('expanded')
    }
  },

  initialState: 'collapsed',

  init () {
    this.on({
      collapse: () => {
        this.state = 'collapsed'
      }
    })

    // Replace this with chassis-accordion
    this.ref.accordion.each((nav, i) => {
      nav = NGNX.REF.create(`nav_${i}`, `${this.ref.accordion.selector}:nth-child(${i + 1})`)
      nav.find('> header').on('click', evt => nav.element.classList.toggle('collapsed'))
    })

    this.ref.expandButton.on('click', evt => this.state = 'expanded')
    this.ref.collapseButton.on('click', evt => this.state = 'collapsed')
  }
})
