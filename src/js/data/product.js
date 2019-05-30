const Product = new NGN.DATA.Model({
  fields: {
    name: String,
    title: String,
    description: String,
    manifest: Object
  },

  relationships: {
    nav: [new NGN.DATA.Model({
      fields: {
        label: String,
        path: String,
        url: String,
        external: Boolean,
        href: String
      }
    })]
  }
})

export default Product
