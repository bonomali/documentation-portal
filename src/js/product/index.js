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
