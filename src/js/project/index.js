NGNX.Loader({
  sync: [
    '/js/project/registries/main.js',
    '/js/project/registries/sidebar.js',
    '/js/project/registries/workspace.js'
  ]
})

NGN.DOM.ready(() => {
  NGN.BUS.on('*', function () {
    console.log(this.event);
  })

  NGN.DOM.svg.update()
})
