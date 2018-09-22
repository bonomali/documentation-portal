Product.view = new NGNX.VIEW.Registry({
  selector: '.product',
  namespace: 'product.',

  references: {
    apiMenu: `nav.api-reference > ol`
  },

  templates: {
    category: '../../templates/category.html'
  },

  init () {
    this.on({
      populate: () => {
        this.renderCategories(this.ref.apiMenu)
      }
    })
  }
})

Product.view.renderCategories = function (parent) {
  let tasks = new NGN.Tasks()

  Product.data.datafields.forEach(field => {
    if (field === 'id') {
      return
    }

    let name = field.charAt(0).toUpperCase() + field.slice(1)

    tasks.add(`Generate ${name} list item.`, next => {
      let id = `category_${field}`

      // this.render('category', {name}, parent.element, element => next())

      this.render('category', {name, id}, template => {
        NGN.DOM.guaranteeDirectChild(parent.element, `#${id}`, 0, next)
        parent.element.insertAdjacentHTML('beforeend', template)
      })
    })
  })

  tasks.run(true)
}
