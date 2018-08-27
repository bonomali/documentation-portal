const ProductWorkspace = new NGNX.VIEW.Registry({
  parent: Product,
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
      registry: ProductSidebar,
      reactions: {
        expanded: 'overlaid',
        collapsed: 'default'
      }
    }
  ]
})

ProductWorkspace.clickHandler = function (evt) {
  ProductSidebar.emit('collapse')
}
