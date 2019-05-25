class AppManager extends NGN.EventEmitter {
  constructor () {
    super()

    this.view = null
  }
}

class DataManager extends NGN.EventEmitter {
  constructor (cfg) {
    super()

    this.manifest = {}
    this.resources = {}
  }

  addResource (name, value) {
    this.resources[name] = value
  }

  getResource (name) {
    return this.resources[name]
  }

  getResourceHref (name) {
    return this.manifest[`${name}_href`]
  }
}

NGNX.Loader({
  sync: [
    '/js/product/registries/main.js',
    '/js/product/registries/sidebar.js',
    '/js/product/registries/workspace.js'
  ]
})

NGN.DOM.ready(() => {
  // NGN.BUS.on('*', function () {
  //   console.log(this.event);
  // })

  NGN.DOM.svg.update()
})
