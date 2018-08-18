const ProjectSidebar = new NGNX.VIEW.Registry({
  parent: Project,
  selector: 'aside.sidebar',
  namespace: 'sidebar.',

  references: {
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
      expandButton,
      collapseButton
    } = this.ref

    expandButton.on('click', evt => this.state = 'expanded')
    collapseButton.on('click', evt => this.state = 'collapsed')
  }
})
