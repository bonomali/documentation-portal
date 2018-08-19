const ProjectSidebar = new NGNX.VIEW.Registry({
  parent: Project,
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
    let {
      accordion,

      expandButton,
      collapseButton
    } = this.ref

    accordion.each((nav, i) => {
      nav = NGNX.REF.create(`nav_${i}`, `${accordion.selector}:nth-child(${i + 1})`)
      nav.find('> header').on('click', evt => nav.element.classList.toggle('collapsed'))
    })

    expandButton.on('click', evt => this.state = 'expanded')
    collapseButton.on('click', evt => this.state = 'collapsed')
  }
})
