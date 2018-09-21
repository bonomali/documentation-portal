const ProductModel = (function () {
  let _priv = new WeakMap()

  return class extends NGN.EventEmitter {
    constructor () {
      super()

      let Model = new NGN.DATA.Model({
        relationships: {
          classes: [new ClassModel()],
          bus: [new EventModel()],
          exceptions: [new ExceptionModel]//,
          // namespaces: [new]
        }
      })

      _priv.set(this, {
        model: new Model()
      })

      _priv.get(this).model.on('load', evt => {
        this.emit('load', _priv.get(this).model)
      })
    }

    get asJson () {
      return _priv.get(this).model.data
    }

    load (relationship, data) {
      return console.log(new (new ClassModel())())

      if (!_priv.get(this).model.has(relationship)) {
        return console.warn(`NGN Product does not have "${relationship}" relationship!`)
      }

      _priv.get(this).model[relationship].load(Object.keys(data).map(key => data[key]))
    }
  }
})()

Product.data = new ProductModel()

NGN.BUS.emit('models.ngn.initiated')
