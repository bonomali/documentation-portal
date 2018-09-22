const NamespaceModel = new ClassModel({
  relationships: {
    namespaces: [NamespaceModel]
  }
})

NGN.BUS.emit('product.model.initiated')
