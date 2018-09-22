const NamespaceModel = new ClassModel({
  fields: {
    namespaces: {
      type: Object,
      default: {}
    }
  }
})

NGN.BUS.emit('product.model.initiated')
