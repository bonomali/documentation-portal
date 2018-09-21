Product.view.workspace = new NGNX.VIEW.Registry({
  parent: Product.view,
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
      registry: Product.view.sidebar,
      reactions: {
        expanded: 'overlaid',
        collapsed: 'default'
      }
    }
  ]
})

Product.view.workspace.clickHandler = function (evt) {
  Product.view.sidebar.emit('collapse')
}
