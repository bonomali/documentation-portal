class ProductPage extends NGNX.VIEW.Registry {
  fetchAPIData (baseUrl = baseUrl) {
    NGN.NET.json(baseUrl, (err, data) => {
      if (err) {
        throw err
      }

      API.load(data)
    })
  }
}

const Product = new ProductPage({
  selector: '.product',
  namespace: 'product.',

  init () {

  }
})
