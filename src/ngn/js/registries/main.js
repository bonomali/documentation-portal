const NGNProduct = new ProductPage({
  selector: '.ngn.product',
  namespace: 'ngn.product.',

  references: {
    apiMenu: `nav.api-reference > ol`
  },

  templates: {
    category: '../../templates/category.html'
  },

  init () {
    API.once('load', () => this.emit('populate'))
    this.fetchAPIData(baseUrl)

    this.on({
      populate: () => {
        this.renderCategories(this.ref.apiMenu)
      }
    })
  }
})

NGNProduct.renderCategories = function (parent) {
  let tasks = new NGN.Tasks()

  API.datafields.forEach(field => {
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
