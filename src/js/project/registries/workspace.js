const ProjectWorkspace = new NGNX.VIEW.Registry({
  parent: Project,
  selector: '.workspace',
  namespace: 'workspace.',

  states: {
    default () {
      this.self.element.classList.remove('overlaid')
      // this.self.off('click', this.clickHandler)
      this.self.element.removeEventListener('click', this.clickHandler)
    },

    overlaid () {
      this.self.element.classList.add('overlaid')
      // this.self.on('click', this.clickHandler)
      this.self.element.addEventListener('click', this.clickHandler)
    }
  },

  reflexes: [
    {
      registry: ProjectSidebar,
      reactions: {
        expanded: 'overlaid',
        collapsed: 'default'
      }
    }
  ]
})

ProjectWorkspace.clickHandler = function (evt) {
  ProjectSidebar.emit('collapse')
}
